from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import IntegrityError

from .core.config import settings
from .core.database import Base, engine

# Import routers
from .employees.router import router as employee_router
from .attendance.router import router as attendance_router

# Import handlers
from .core.handlers import (
    app_exception_handler,
    validation_exception_handler,
    integrity_exception_handler,
    generic_exception_handler
)

# Import custom exception
from .core.errors import AppException

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HRMS Lite API",
    version="1.0.0"
)

# CORS (Good as is)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],
    allow_headers=["Authorization", "Content-Type"],
)

# Register Exception Handlers (CRITICAL)
app.add_exception_handler(AppException, app_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(IntegrityError, integrity_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)

# Include routers
app.include_router(employee_router)
app.include_router(attendance_router)