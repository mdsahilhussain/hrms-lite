def success_response(data=None, message="Success"):
    return {
        "success": True,
        "message": message,
        "data": data
    }


def paginated_response(results, total, page, page_size):
    # Validation for pagination parameters
    if page_size <= 0:
        raise ValueError("page_size must be a positive integer")

    # Ensure page is at least 1
    if page < 1:
        raise ValueError("page must be at least 1")

    total_pages = (total + page_size - 1) // page_size

    return {
        "success": True,
        "message": "Data fetched successfully",
        "data": {
            "pagination": {
                "count": total,
                "total_pages": total_pages,
                "current_page": page,
                "page_size": page_size,
                "next": page + 1 if page < total_pages else None,
                "previous": page - 1 if page > 1 else None
            },
            "results": results
        }
    }


def error_response(message="Error"):
    return {
        "success": False,
        "message": message
    }