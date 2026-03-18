from fastapi import HTTPException

# Custom exception class for application-specific errors
class AppException(HTTPException):
    def __init__(self, status_code: int, message: str):
        super().__init__(status_code=status_code, detail=message)

# 404 Not Found: The requested resource could not be found. This is commonly used when a client tries to access a resource that doesn't exist.
def not_found(message="Resource not found"):
    raise AppException(404, message)

# 400 Bad Request: The request was invalid or cannot be served. This is often used when the client sends malformed data or missing required fields.
def bad_request(message="Bad request"):
    raise AppException(400, message)

# 401 Unauthorized: The client must authenticate itself to get the requested response. This is used when authentication is required and has failed or has not yet been provided.
def conflict(message="Conflict"):
    raise AppException(409, message)