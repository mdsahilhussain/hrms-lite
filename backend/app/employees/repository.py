from sqlalchemy.orm import Session
from .models import Employee

# Repository functions for managing Employee records in the database
def create_employee(db: Session, data):
    emp = Employee(**data.dict())
    db.add(emp)
    db.commit()
    db.refresh(emp)
    return emp

# Retrieve an employee by their unique employee ID
def get_by_employee_id(db: Session, employee_id: str):
    return db.query(Employee).filter(
        Employee.employee_id == employee_id
    ).first()

# Retrieve an employee by their unique email address
def get_by_email(db: Session, email: str):
    return db.query(Employee).filter(
        Employee.email == email
    ).first()

# Retrieve a list of employees with pagination support (skip and limit)
def get_employees(db: Session, skip=0, limit=20):
    return db.query(Employee)\
        .offset(skip)\
        .limit(limit)\
        .all()

# Count the total number of employee records in the database
def count_employees(db: Session):
    return db.query(Employee).count()

# Update an existing employee's information based on their employee ID
def delete_employee(db: Session, employee_id: str):
    emp = get_by_employee_id(db, employee_id)

    if emp:
        db.delete(emp)
        db.commit()

    return emp