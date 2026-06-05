# Full-Stack Mini Payroll & Attendance SaaS

A production-ready, beautifully designed SaaS MVP for managing employee payroll, attendance, and leaves. This project fulfills all requirements for a complete, end-to-end full-stack application assignment.

## 🚀 Features & Assignment Fulfillment

### 1. Security & Authentication
- **JWT Authentication:** All backend endpoints are secured via JWT bearer tokens.
- **BCrypt Password Hashing:** User passwords are encrypted in the database.
- **Frontend Route Guards:** Unauthorized users are automatically kicked back to the login screen.

### 2. Employee Management (CRUD)
- Create new employees with predefined roles (WFH, Office, On-site) and salary types (Monthly, Daily).
- View all employees in a clean directory.
- Update existing employees.
- Delete employees (cascades to delete their attendance, leaves, and payroll records).
- **Confirmation Dialogs** to prevent accidental deletions.

### 3. Attendance Tracking
- Admins can select an employee and date to mark them as `PRESENT` or `ABSENT`.
- Attendance is used directly in the Payroll calculation.

### 4. Leave Management
- Employees/Admins can apply for leave.
- Admins can Approve or Reject leaves using a global Confirmation Dialog.

### 5. Automated Payroll Generator
- Calculates salary dynamically based on attendance:
  - **Monthly Wage:** `(Monthly Salary / 30) × Present Days`
  - **Daily Wage:** `Daily Wage × Present Days`
- Generates and stores immutable payroll records per month.

---

## 🛠️ Technology Stack

*   **Frontend:** Angular 18 (Standalone Components, RxJS, Angular Material, Clean Corporate UI styling)
*   **Backend:** Spring Boot 3.3.0 (Java 21, Spring Security, JWT, Spring Data JPA, Hibernate)
*   **Database:** MySQL

---

## 💻 How to Run Locally

### 1. Database Setup
1. Open **MySQL Workbench** and ensure your local server is running on port `3306`.
2. Ensure you have a schema named `payroll_db` (or allow Spring Boot to auto-create it).
3. Open `payroll-backend/src/main/resources/application.yml`.
4. Update the `username` and `password` to match your local MySQL Workbench credentials.

### 2. Run the Backend (Spring Boot)
Open a terminal in the `payroll-backend` directory and run:
```bash
mvn spring-boot:run
```
*(The backend runs on `http://localhost:8080`. The database tables and default admin user will be automatically created on startup).*

### 3. Run the Frontend (Angular)
Open a new terminal in the `payroll-frontend` directory and run:
```bash
npm install
npm start
```
*(The frontend runs on `http://localhost:4200`)*.

---

## 🔐 Default Login Credentials

Upon the first backend startup, an Admin user is automatically seeded into the database. Use these credentials to log in:

- **Email:** `mydeen@gmail.com`
- **Password:** `12345`

---

## 🌍 Deployment Instructions (To host Live)

If you wish to deploy this to the internet so evaluators don't have to install it locally:

1. **Database:** Create a free MySQL database on [Aiven](https://aiven.io/) or [Clever-Cloud](https://www.clever-cloud.com/).
2. **Backend (Render):** 
   - Push this code to GitHub.
   - Go to [Render](https://render.com) -> New Web Service.
   - Set Root Directory to `payroll-backend`.
   - Build Command: `mvn clean package -DskipTests`
   - Start Command: `java -jar target/payroll-backend-0.0.1-SNAPSHOT.jar`
   - Add Environment Variables for your live Database URL, Username, and Password.
3. **Frontend (Vercel):**
   - Go to [Vercel](https://vercel.com) -> Import GitHub Project.
   - Set Root Directory to `payroll-frontend`.
   - Ensure the API URL in `environment.ts` points to your new Render backend URL.
   - Click Deploy.
