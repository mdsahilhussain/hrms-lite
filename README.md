# HRMS Lite (FastAPI + React)

A lightweight Human Resource Management System for managing employees and their daily attendance.
This project is designed for a single admin user to manage employee data and monitor attendance records in real time.

---

## Project Overview

This application provides two core modules:

Employee Management
- Add new employees
- View employee directory
- Delete employees

Attendance Management
- Mark daily attendance
- View attendance records per employee
- Prevent duplicate attendance for the same employee and date
- Generate summary insights

The project is structured as a full-stack monorepo.
```base
backend/   → FastAPI backend with SQLite database
frontend/  → React (Vite) admin dashboard
```


## Tech Stack

Frontend
- React 18
- Vite
- Axios
- CSS / Tailwind (optional)

Backend
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn
- CORS Middleware

Database
- SQLite (local development)

---

## Features Implemented

### Employee Management
- Add employee with validation
- Required fields validation
- Unique employee ID
- Valid and unique email
- View employee list
- Delete employee

### Attendance Management
- Mark attendance with:
- Employee ID
- Date
- Status (Present / Absent)
- Prevent duplicate attendance entries
- View attendance records for employees
- Filter attendance by date

### Dashboard Summary (Real-time)

Displays system insights such as:
- Total Employees
- Total Attendance Records
- Today Present Entries
- Today Absent Entries

## UI States
Frontend handles:
- Loading states
- Empty states
- Error states

## API Design
RESTful API responses with proper HTTP status codes.

---

## Folder Structure
```base
hrms-lite/
├── README.md
├── backend/
│   ├── .gitignore
│   ├── app/
│   │   ├── __init__.py
│   │   ├── attendance/
│   │   │   ├── __init__.py
│   │   │   ├── models.py
│   │   │   ├── repository.py
│   │   │   ├── router.py
│   │   │   ├── schemas.py
│   │   │   └── service.py
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   ├── errors.py
│   │   │   ├── handlers.py
│   │   │   └── responses.py
│   │   ├── employees/
│   │   │   ├── __init__.py
│   │   │   ├── models.py
│   │   │   ├── repository.py
│   │   │   ├── router.py
│   │   │   ├── schemas.py
│   │   │   └── service.py
│   │   └── main.py
│   ├── requirements.txt
│   └── start.sh
└── frontend/
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    ├── src/
    │   ├── .env.example
    │   ├── App.tsx
    │   ├── api/
    │   │   ├── attendanceApi.ts
    │   │   ├── axios.ts
    │   │   └── employeeApi.ts
    │   ├── components/
    │   │   ├── attendance/
    │   │   │   ├── AttendanceFilter.tsx
    │   │   │   ├── AttendanceRow.tsx
    │   │   │   ├── AttendanceTable.tsx
    │   │   │   └── MarkAttendanceForm.tsx
    │   │   ├── employee/
    │   │   │   ├── AddEmployeeForm.tsx
    │   │   │   ├── EmployeeRow.tsx
    │   │   │   └── EmployeeTable.tsx
    │   │   ├── layout/
    │   │   │   └── Header.tsx
    │   │   ├── stats/
    │   │   │   ├── OverviewStats.tsx
    │   │   │   └── StatCard.tsx
    │   │   └── ui/
    │   │       ├── Button.tsx
    │   │       ├── Card.tsx
    │   │       ├── Input.tsx
    │   │       ├── Pagination.tsx
    │   │       └── Table.tsx
    │   ├── hooks/
    │   │   ├── useAttendance.ts
    │   │   └── useEmployees.ts
    │   ├── lib/
    │   │   ├── queryClient.ts
    │   │   └── utils.ts
    │   ├── main.tsx
    │   ├── pages/
    │   │   └── Dashboard.tsx
    │   ├── style.css
    │   └── types/
    │       ├── attendance.ts
    │       └── employee.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

## Run Locally

### 1. Backend Setup
Navigate to backend directory:
```bash
cd backend
```

Create virtual environment:
```bash
python3 -m venv venv
```

Activate environment:
Mac/Linux
```bash
source venv/bin/active
```

Windows
```bash
venv\Scripts\activate
```

Install dependencies:
```bash
pip install -r requirement.txt
```

Run FastAPI server:
```bash
uvicorn app.main:app --reload
```

Backend runs at:
```bash
http://127.0.0.1:8000
```

API documentation available at:
```bash
http://127.0.0.1:8000/docs
```

### 2. Frontend Setup
Open another terminal.

Navigate to frontend:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start development server:
```bash
npm run dev
```

Frontend runs at:
```bash
http://localhost:5173
```


## API Endpoints
Employee APIs
```base
GET    /employees
POST   /employees
DELETE /employees/{employee_id}
```

Attendance APIs
```base
POST /attendance
GET  /attendance
GET  /attendance/{employee_id}
GET /attendance/{date}
```

Dashboard Summary
```bash
GET /attendance/summary
```
## Assumptions and Limitations
-  Single admin user (authentication not implemented)
-  SQLite used for development database
-  No role-based access control
-  Pagination not implemented due to assignment scope
-  Backend currently allows open CORS for development
-  Data validation handled via Pydantic schemas


## Conclusion

HRMS Lite demonstrates a simple yet scalable architecture for managing employees and attendance records using FastAPI and React. The project follows clean backend layering with router → service → repository structure and provides REST APIs suitable for real-time dashboard integrations.