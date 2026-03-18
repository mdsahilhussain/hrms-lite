from pydantic import BaseModel, EmailStr
from datetime import datetime

# Request model for creating a new employee, excluding the auto-generated ID and creation timestamp
class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str

# Response model for returning employee data, including the auto-generated ID and creation timestamp
class EmployeeResponse(EmployeeCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True