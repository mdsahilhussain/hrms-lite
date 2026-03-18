from sqlalchemy import Column, Integer, String, Date, ForeignKey, UniqueConstraint, Enum
from enum import Enum as PyEnum
from app.core.database import Base

# Enum for attendance status
class AttendanceStatus(str, PyEnum):
    present = "present"
    absent = "absent"

# Attendance model to store employee attendance records
class Attendance(Base):
    __tablename__ = "attendance"
    __table_args__ = (
        UniqueConstraint("employee_id", "date", name="unique_employee_date"),
    )

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String, ForeignKey("employees.employee_id"), nullable=False)
    date = Column(Date, nullable=False, index=True)
    status = Column(Enum(AttendanceStatus, name="attendance_status"), nullable=False)