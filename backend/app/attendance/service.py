from app.core.errors import AppException, conflict, not_found
from sqlalchemy.orm import Session
from datetime import date
from . import repository
from app.employees.models import Employee

# Service functions for attendance management
def mark_attendance_service(db: Session, data):
    # Check employee exists
    employee = db.query(Employee).filter(
        Employee.employee_id == data.employee_id
    ).first()

    if not employee:
        not_found(f"Employee '{data.employee_id}' not found")


    # Prevent duplicate entry
    existing = repository.get_by_employee_date(
        db, data.employee_id, data.date
    )

    if existing:
        conflict(
            f"Attendance already marked for employee '{data.employee_id}' on {data.date}"
        )

    return repository.create_attendance(db, data)

# Get attendance records for a specific employee with pagination
def employee_attendance_service(db: Session, employee_id: str, page=1, page_size=20):
    if page < 1:
        raise AppException(400, "Page number must be at least 1")
    
    if page_size < 1 or page_size > 100:
        raise AppException(400, "Page size must be between 1 and 100")

    skip = (page - 1) * page_size

    employee = db.query(Employee).filter(
        Employee.employee_id == employee_id
    ).first()

    if not employee:
        not_found(f"Employee '{employee_id}' not found")

    records = repository.get_by_employee(db, employee_id, skip, page_size)
    total = repository.count_by_employee(db, employee_id)

    full_name = employee.full_name if employee else None

    result = [
        {
            "employee_id": r.employee_id,
            "date": r.date.isoformat() if r.date else None,
            "status": r.status,
            "full_name": full_name
        }
        for r in records
    ]

    return result, total

# Get attendance records for a specific date with pagination
def attendance_by_date_service( db: Session, attendance_date: date, page=1, page_size=20):
    if page < 1:
        raise AppException(400, "Page number must be at least 1")
    if page_size < 1 or page_size > 100:
        raise AppException(400, "Page size must be between 1 and 100")
    skip = (page - 1) * page_size

    records = repository.get_by_date(db, attendance_date, skip, page_size)
    total = repository.count_by_date(db, attendance_date)

    results = [
        {
            "employee_id": r.employee_id,
            "date": r.date.isoformat() if r.date else None,  # ✅ fix serialization
            "status": r.status
        }
        for r in records
    ]

    return results, total

# Get summary of attendance records for dashboard
def summary_service(db: Session):
    today = date.today()

    total_employee = repository.count_employees(db)
    total_attendance = repository.count_attendance(db)
    present = repository.count_by_status_today(db, today, status="present")
    absent =  repository.count_by_status_today(db, today, status="absent")

    return {
        "total_records": total_employee,
        "total_attendance": total_attendance,
        "today_present": present,
        "today_absent": absent,
    }