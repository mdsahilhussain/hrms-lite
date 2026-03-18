from sqlite3 import IntegrityError
from sqlalchemy.orm import Session
from . import repository
from app.core.errors import AppException

# Service layer functions for handling business logic related to Employee operations
def create_employee_service(db: Session, data):
    # Check for existing employee ID or email to prevent duplicates
    if repository.get_by_employee_id(db, data.employee_id):
        raise AppException(409, f"Employee ID '{data.employee_id}' already exists")

    # Check for existing email to prevent duplicates
    if repository.get_by_email(db, data.email):
        raise AppException(409, f"Email '{data.email}' already exists")

    try:
        return repository.create_employee(db, data)
    except IntegrityError:
        db.rollback()
        raise AppException(409, "Duplicate employee_id or email")

# Retrieve a single employee by their unique employee ID
def list_employees_service(db: Session, page=1, page_size=20):
    if page < 1:
        raise AppException(400, "Page number must be at least 1")
    
    if page_size < 1 or page_size > 100:
        raise AppException(400, "Page size must be between 1 and 100")

    skip = (page - 1) * page_size

    employees = repository.get_employees(db, skip, page_size)
    total = repository.count_employees(db)

    results = [
        {
            "employee_id": e.employee_id,
            "full_name": e.full_name,
            "email": e.email,
            "department": e.department,
            "created_at": e.created_at
        }
        for e in employees
    ]

    return results, total


# Delete an employee by their unique employee ID
def delete_employee_service(db: Session, employee_id: str):
    emp = repository.delete_employee(db, employee_id)

    if not emp:
        raise AppException(404, f"Employee with ID '{employee_id}' not found")

    return emp