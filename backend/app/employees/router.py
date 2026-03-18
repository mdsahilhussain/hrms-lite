from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.responses import success_response, paginated_response
from . import schemas, service

router = APIRouter(prefix="/employees", tags=["Employees"])

# Create a new employee record in the database
@router.post("/")
def create_employee(
    data: schemas.EmployeeCreate,
    db: Session = Depends(get_db)
):
    emp = service.create_employee_service(db, data)
    return success_response(emp, "Employee created successfully")

# List employees with pagination support (page number and page size)
@router.get("/")
def list_employees(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    results, total = service.list_employees_service(
        db, page, page_size
    )

    return paginated_response(results, total, page, page_size)

# Delete an employee by their unique employee ID
@router.delete("/{employee_id}",)
def delete_employee(
    employee_id: str,
    db: Session = Depends(get_db)
):
    emp=service.delete_employee_service(db, employee_id)
    return success_response(emp, "Employee deleted successfully")