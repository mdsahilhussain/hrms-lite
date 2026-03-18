from pydantic import BaseModel
from enum import Enum
from datetime import date
from typing import Optional

# Enum for attendance status
class AttendanceStatus(str, Enum):
    present = "present"
    absent = "absent"

# Pydantic models for request and response validation
class AttendanceCreate(BaseModel):
    employee_id: str
    date: date
    status: AttendanceStatus

# Response model for attendance records
class AttendanceResponse(BaseModel):
    employee_id: str
    date: date
    status: str
    full_name: Optional[str] = None

    class Config:
        from_attributes = True

# Request model for filtering attendance records
class AttendanceFilter(BaseModel):
    date: Optional[date] = None # type: ignore
    skip: int = 0
    limit: int = 20