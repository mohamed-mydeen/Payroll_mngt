# Mini Payroll & Attendance System

This is a full-stack SaaS MVP built using Java (Spring Boot) and Angular. The application allows an organization to manage employees, track daily attendance, process leave requests, and automatically generate monthly/daily payroll slips based on attendance records.

## System Architecture

- **Backend**: Java 21, Spring Boot 3.3.0
- **Frontend**: Angular 18 (Standalone Components)
- **Database**: MySQL 8
- **Security**: Spring Security with JWT (JSON Web Tokens) for stateless authentication.

The architecture follows a standard multi-layer pattern (Controller -> Service -> Repository) keeping business logic properly decoupled from HTTP transport layers.

## Database Schema & Entity Relationships

The database is built on MySQL using Hibernate/JPA for ORM. The primary relationships are all centralized around the `Employee` entity.

1. **Employee**: The core entity storing user details, roles, and salary data.
2. **Attendance**: Maps to `Employee` (Many-to-One). Stores daily PRESENT/ABSENT status.
3. **LeaveRequest**: Maps to `Employee` (Many-to-One). Stores start/end dates, reason, and Approval status.
4. **Payroll**: Maps to `Employee` (Many-to-One). Stores generated monthly salary calculations based on attendance.

*Note: Bidirectional mappings are configured with `CascadeType.ALL` and `orphanRemoval = true` to maintain referential integrity when an employee is modified or deleted.*

## Core Business Logic (Payroll)

Payroll generation dynamically calculates salary based on the `salaryType` of the employee:
- **MONTHLY**: `(Monthly Salary / 30) × Present Days`
- **DAILY**: `Daily Wage × Present Days`

The system queries the `Attendance` table for the specific month/year to find the exact number of `PRESENT` days before executing the calculation.

## API Endpoints

### Auth
- `POST /api/auth/login`: Authenticate and receive JWT token

### Employees
- `POST /api/employees`: Create a new employee
- `GET /api/employees`: Fetch all employees
- `GET /api/employees/{id}`: Fetch employee by ID

### Attendance
- `POST /api/attendance`: Mark attendance (Present/Absent)
- `GET /api/attendance/employee/{id}`: View attendance history for an employee

### Leaves
- `POST /api/leaves`: Apply for leave
- `PATCH /api/leaves/{id}/status`: Approve or reject a leave request
- `GET /api/leaves`: View all leave requests

### Payroll
- `POST /api/payroll/generate/{employeeId}`: Generate payroll slip for a specific month and year

## Local Setup Instructions

### Prerequisites
- Java 21+
- Node.js & npm (for Angular)
- MySQL Server (running on port 3306)

### 1. Database Setup
Ensure MySQL is running on port `3306` with the username `root` and password `root`. 
*(You do not need to create the database manually. Hibernate will automatically create `payroll_db` on startup).*

### 2. Backend Setup
Navigate to the `payroll-backend` directory and run:
```bash
mvn spring-boot:run
```
The backend will start on `http://localhost:8080`.

### 3. Frontend Setup
Navigate to the `payroll-frontend` directory and install dependencies:
```bash
npm install
```
Start the development server:
```bash
ng serve
```
The frontend will be accessible at `http://localhost:4200`.

### 4. Test Credentials
- **Email**: `admin@payroll.com`
- **Password**: `admin123`
