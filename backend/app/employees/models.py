from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from ..core.database import Base

# Employee model representing the employees table in the database
class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String, unique=True)
    full_name = Column(String)
    email = Column(String, unique=True)
    department = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())