from sqlalchemy.orm import Session
from typing import List
from .models import Attendance
from app.employees.models import Employee
from datetime import date

# Repository functions for Attendance model
def create_attendance(db: Session, data) -> Attendance:
    attendance = Attendance(**data.dict())
    db.add(attendance)
    db.commit()
    db.refresh(attendance)
    return attendance

# Get attendance record by employee ID and date
def get_by_employee_date(db: Session, employee_id: str, attendance_date: date):
    return db.query(Attendance).filter(
        Attendance.employee_id == employee_id,
        Attendance.date == attendance_date
    ).first()

# Get attendance records by employee ID with pagination
def get_by_employee(db: Session, employee_id: str, skip=0, limit=20) -> List[Attendance]:
    return db.query(Attendance)\
        .filter(Attendance.employee_id == employee_id)\
        .offset(skip)\
        .limit(limit)\
        .all()

# Count total attendance records for a specific employee
def count_by_employee(db: Session, employee_id: str) -> int:
    return db.query(Attendance).filter(
        Attendance.employee_id == employee_id
    ).count()

# Get attendance records by date with pagination
def get_by_date(db: Session, attendance_date: date, skip=0, limit=20):
    return db.query(Attendance)\
        .filter(Attendance.date == attendance_date)\
        .offset(skip)\
        .limit(limit)\
        .all()

# Count total attendance records in the system
def count_attendance(db: Session):
    return db.query(Attendance).count()

# Count total employees in the system
def count_employees(db: Session):
    return db.query(Employee).count()

# Count attendance records by status for a today date
def count_by_status_today(db: Session, today, status: str):
    return db.query(Attendance).filter(
        Attendance.date == today,
        Attendance.status == status
    ).count()
