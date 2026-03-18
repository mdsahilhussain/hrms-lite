from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from datetime import date
from app.core.database import get_db
from app.core.responses import paginated_response, success_response
from . import schemas, service

router = APIRouter(prefix="/attendance", tags=["Attendance"])

# Mark attendance for an employee on a specific date
@router.post("/")
def mark_attendance(
    data: schemas.AttendanceCreate,
    db: Session = Depends(get_db)
):
    result = service.mark_attendance_service(db, data)
    return success_response(result, "Attendance marked successfully")


# Get attendance records for a specific date with pagination
@router.get("/")
def get_attendance_by_date(
    attendance_date: date = Query(...),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    results, total = service.attendance_by_date_service(
        db, attendance_date, page, page_size
    )

    return paginated_response(results, total, page, page_size)

# Get attendance records for a specific employee with pagination
@router.get("/employee/{employee_id}")
def get_employee_attendance(
    employee_id: str,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, le=100),
    db: Session = Depends(get_db)
):
    results, total = service.employee_attendance_service(
        db, employee_id, page, page_size
    )

    return paginated_response(results, total, page, page_size)

# Get attendance summary for today
@router.get("/summary")
def attendance_summary(db: Session = Depends(get_db)):
    summary = service.summary_service(db)
    return success_response(summary)