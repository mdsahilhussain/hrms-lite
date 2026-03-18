from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import IntegrityError
from .errors import AppException
from .responses import error_response

# Global exception handler for application-specific exceptions
async def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(
        status_code=exc.status_code,
        content=error_response(exc.detail)
    )

# Handle validation errors from FastAPI
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "message": "Validation error",
            "errors": exc.errors()
        }
    )

# Handle database integrity errors (e.g., unique constraint violations)
async def integrity_exception_handler(request: Request, exc: IntegrityError):
    return JSONResponse(
        status_code=409,
        content=error_response("Duplicate entry detected")
    )

# Handle any other unhandled exceptions to prevent exposing internal details
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content=error_response("Internal server error")
    )