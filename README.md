# Mini Payroll & Attendance System

A production-ready SaaS MVP for managing employee payroll, attendance, and leaves.

## Architecture

*   **Frontend:** Angular 18 (Standalone Components, Angular Material, Glassmorphism UI)
*   **Backend:** Spring Boot 3.2.5 (Java 21, Spring Security, JWT)
*   **Database:** PostgreSQL 15

## System Design

*   **Role-Based Access Control:** Users are seeded via `DataSeeder`. Admins manage employees and payroll. Employees view their own data.
*   **Payroll Core Logic:** Calculated as `(salary / 30) * presentDays` for Monthly, or `dailyWage * presentDays` for Daily.
*   **Entities:**
    *   `Employee` (1:M with Attendance, Leave, Payroll)
    *   `Attendance` (Unique constraint on employee + date)
    *   `LeaveRequest` (Pending, Approved, Rejected)
    *   `Payroll` (Generated monthly)

## API Endpoints

*   **Auth:** `POST /api/auth/login` -> Returns JWT token
*   **Employees:** `GET /api/employees`, `POST /api/employees`
*   **Attendance:** `POST /api/attendance`, `GET /api/attendance/employee/{id}`
*   **Leaves:** `POST /api/leaves`, `PATCH /api/leaves/{id}/status`
*   **Payroll:** `POST /api/payroll/generate/{employeeId}`

## Deployment Instructions (Live URL)

To satisfy the "Live URL" deployment requirement, follow these simple steps to deploy this full-stack application to the cloud for free:

### 1. Database (Supabase / Render PostgreSQL)
1. Create a free PostgreSQL database on [Render](https://render.com) or [Supabase](https://supabase.com).
2. Copy the Database URL.

### 2. Backend (Render)
1. Push this repository to GitHub.
2. Go to [Render](https://render.com), create a new **Web Service**, and connect your GitHub repo.
3. Set the Root Directory to `payroll-backend`.
4. Build Command: `mvn clean package -DskipTests`
5. Start Command: `java -jar target/payroll-backend-0.0.1-SNAPSHOT.jar`
6. Add Environment Variables:
   * `SPRING_DATASOURCE_URL` = your database URL
   * `SPRING_DATASOURCE_USERNAME` = your DB username
   * `SPRING_DATASOURCE_PASSWORD` = your DB password

### 3. Frontend (Vercel)
1. Go to [Vercel](https://vercel.com) and import the GitHub repository.
2. Set the Root Directory to `payroll-frontend`.
3. Build Command: `npm run build`
4. Deploy! Your app is now live with a public URL.
