# Money Manager

A personal finance web application (backend + frontend) that helps users track incomes, expenses, categories, view a dashboard, filter transactions, export reports to Excel, and email reports. This repository contains two main projects:

- Backend (Spring Boot, Java 17) — `Backend-moneymanager`
- Frontend (React + Vite) — `Frontend-moneymanager`

This README documents the project structure, APIs, data shapes, environment configuration, and step-by-step instructions to run and develop locally.

## Table of contents

- About
- Key features
- Tech stack
- Repository structure
- API (backend) — endpoints & payloads
- Data shapes (DTOs)
- Environment / Configuration
- Run locally (Backend)
- Run locally (Frontend)
- Docker / Production notes
- Development notes & tips
- Troubleshooting
- Next steps
- License

## About

Money Manager is a lightweight personal finance manager. The backend exposes a REST API (secured with JWT) and supports: account registration with email activation, login, creating/updating categories, recording incomes and expenses, filtering and downloading Excel reports, and emailing those reports.

The frontend is a React app built with Vite and Tailwind CSS. It consumes the backend REST API, stores the JWT token in `localStorage`, and renders a responsive dashboard and CRUD pages for transactions and categories.

## Key features

- User registration with activation email
- JWT-based authentication
- CRUD for categories, incomes and expenses
- Monthly dashboard (aggregates)
- Filter transactions by date, keyword, type, and sort order
- Export incomes/expenses to Excel and download or email them
- Cloudinary-based profile image uploads
- Frontend routing for home, dashboard, income, expense, category pages

## Tech stack

| Layer | Technology |
|---|---|
| Backend | Java 17 · Spring Boot 3 · Spring Data JPA · Spring Security · JWT (jjwt) · Apache POI · JavaMail |
| Database | MySQL (dev) · PostgreSQL (prod) |
| Frontend | React 18 · Vite · Tailwind CSS · Axios · Recharts |
| Dev / Infra | Maven · Docker · Cloudinary (uploads) · Brevo (SMTP) |

## Repository structure (top-level)

- `Backend-moneymanager/` — Spring Boot application
  - `pom.xml` — Maven dependencies
  - `src/main/java/.../controller` — REST controllers (endpoints)
  - `src/main/java/.../dto` — DTO models used over the wire
  - `src/main/java/.../service` — business logic
  - `src/main/resources/application.properties` — runtime configuration
  - `Dockerfile`, `mvnw`, `mvnw.cmd`

- `Frontend-moneymanager/` — React + Vite frontend
  - `package.json` — scripts & deps
  - `src/` — source files (components, pages, utilities)
  - `src/util/apiEndpoints.js` — API path constants

## Backend API — Endpoints & Examples

Base URL: set via environment / `application.properties` (see Environment section). Frontend expects `VITE_SERVER_URL`.

Public (no JWT required):

- GET `/status` or `/health`
  - Returns: `"Application is running"`

- POST `/register`
  - Purpose: Register new account and send activation email
  - Example request JSON:
    {
      "fullName": "John Doe",
      "email": "john@example.com",
      "password": "P@ssw0rd"
    }
  - Response: Created `ProfileDTO` (without password) and activation email is sent.

- GET `/activate?token=<token>`
  - Purpose: Activate account using token sent by email

- POST `/login`
  - Purpose: Authenticate and receive a JWT
  - Request JSON (AuthDTO):
    {
      "email": "john@example.com",
      "password": "P@ssw0rd"
    }
  - Response: { "token": "<jwt>", "user": { /* public profile */ } }

Authenticated endpoints (require header: `Authorization: Bearer <token>`):

Categories
- GET `/categories` — Get all categories for current user
- GET `/categories/{type}` — Get categories by type (type is typically `income` or `expense`)
- POST `/categories` — Create a category (CategoryDTO in request)
  - Request JSON (CategoryDTO):
    {
      "name": "Salary",
      "icon": "💼",
      "type": "income"
    }
- PUT `/categories/{categoryId}` — Update a category

Incomes
- GET `/incomes` — Get current month incomes for current user
- POST `/incomes` — Add an income (IncomeDTO in request)
  - Example request JSON:
    {
      "name": "Monthly Salary",
      "categoryId": 1,
      "amount": 5000.00,
      "date": "2025-10-01"
    }
- DELETE `/incomes/{id}` — Delete an income

Expenses
- GET `/expenses` — Get current month expenses for current user
- POST `/expenses` — Add an expense (ExpenseDTO in request)
  - Example request JSON:
    {
      "name": "Groceries",
      "categoryId": 2,
      "amount": 75.50,
      "date": "2025-10-07"
    }
- DELETE `/expenses/{id}` — Delete an expense

Filter
- POST `/filter` — Filter transactions
  - Request body (FilterDTO):
    {
      "type": "expense", // or "income"
      "startDate": "2025-09-01",
      "endDate": "2025-09-30",
      "keyword": "grocery",
      "sortField": "date",
      "sortOrder": "desc"
    }
  - Response: list of income/expense DTO objects

Dashboard
- GET `/dashboard` — Returns a map/object with aggregated dashboard data (totals, latest transactions, charts data)

Excel & Email
- GET `/excel/download/income` — Download incomes as Excel file for the current month
- GET `/excel/download/expense` — Download expenses as Excel file for the current month
- GET `/email/income-excel` — Email an Excel report of incomes to the user
- GET `/email/expense-excel` — Email an Excel report of expenses to the user

Profile
- GET `/profile` — Get public profile of the current user

Notes:
- The backend enforces ownership checks: deleting a transaction validates the profile matches the current authenticated user.
- The JWT issued by the backend expires after 10 hours (see JwtUtil).

## Data shapes (DTOs)

- ProfileDTO
  - id, fullName, email, profileImageUrl, createdAt, updatedAt

- CategoryDTO
  - id, profileId, name, icon, type, createdAt, updatedAt

- IncomeDTO / ExpenseDTO
  - id, name, icon, categoryName, categoryId, amount (BigDecimal), date (yyyy-MM-dd), createdAt, updatedAt

- AuthDTO
  - email, password

- FilterDTO
  - type, startDate, endDate, keyword, sortField, sortOrder

## Environment / Configuration

Backend uses Spring Boot externalized properties. Important environment variables referenced in `src/main/resources/application.properties`:

- BREVO_USERNAME — SMTP username for Brevo (or your SMTP provider)
- BREVO_PASSWORD — SMTP password
- BREVO_FROM_MAIL_ID — From address used by mail
- JWT_SECRET — Secret string used to sign JWTs (HS256). Must be sufficiently long/secure.
- FRONTEND_URL — Frontend URL (used in emails)
- BACKEND_URL — Backend base URL used to build activation link

Database (examples):
- Development (defaults in `application.properties`): MySQL at `jdbc:mysql://localhost:3306/moneymanager` with username/password (update as needed)
- Production (`application-prod.properties`) expects PostgreSQL env vars:
  - POSTGRESQL_HOST_URL
  - POSTGRESQL_USERNAME
  - POSTGRESQL_PASSWORD

Frontend environment (Vite):
- VITE_SERVER_URL — Base URL of the backend API (e.g., http://localhost:8080)

Create a `.env` file for the frontend (in `Frontend-moneymanager/`):

VITE_SERVER_URL=http://localhost:8080

Backend: you can pass environment variables via system env or a `.env` mechanism for your deployment.

## Run locally — Backend

Prerequisites:
- Java 17 installed
- Maven (or use the provided `mvnw` wrapper)
- MySQL or PostgreSQL depending on configuration

Steps (example using bundled wrapper; run from `Backend-moneymanager`):

1. Configure environment variables (JWT_SECRET, BREVO_USERNAME, BREVO_PASSWORD, BREVO_FROM_MAIL_ID, FRONTENF_URL, BACKEND_URL).
2. Update database credentials in `src/main/resources/application.properties` or set `POSTGRESQL_*` env vars and switch profile.
3. Build & run:

Windows PowerShell example:

```powershell
cd Backend-moneymanager; .\mvnw.cmd clean package -DskipTests=true; .\mvnw.cmd spring-boot:run
```

Or run the JAR produced in `target/`:

```powershell
cd Backend-moneymanager; .\mvnw.cmd clean package -DskipTests=true; java -jar target\moneymanager-app.jar
```

The API should be available on port 8080 by default unless configured differently.

## Run locally — Frontend

Prerequisites:
- Node 18+ and npm or pnpm

Steps:

1. Create `.env` in `Frontend-moneymanager` containing `VITE_SERVER_URL=http://localhost:8080` (or your backend URL).
2. Install deps and run dev server:

```powershell
cd Frontend-moneymanager; npm install; npm run dev
```

The app will start on the Vite dev server (typically http://localhost:5173). Open the browser and access the frontend.

Notes on auth: the frontend uses `localStorage.token` to store the JWT; Axios interceptors add `Authorization: Bearer <token>` to requests except for the whitelist: `/login`, `/register`, `/status`, `/activate`, `/health`.

## Docker / Production notes

There is a `Dockerfile` in `Backend-moneymanager/`. You can build an image and run it in a container, ensuring relevant env vars and database connectivity are provided. Example (from repo root):

```powershell
cd Backend-moneymanager; docker build -t moneymanager-backend .
# then run with env vars, ports and DB connection
```

For production the `application-prod.properties` references PostgreSQL via env variables.

## Development notes & tips

- Security: Keep `JWT_SECRET` private and long. Rotate it if compromised.
- Email: The project uses Brevo (`smtp-relay.brevo.com`) by default in properties. Replace with your SMTP configuration or use a local test SMTP (e.g., MailHog) during dev.
- Uploads: Cloudinary is used for profile image uploads; update `CLOUDINARY_CLOUD_NAME` in frontend utilities if you use a different account.
- Excel reports: Apache POI is used to generate `.xlsx` files on the fly.
- Tests: The Maven surefire plugin is configured to skip tests by default. Add and run unit/integration tests in `Backend-moneymanager/src/test`.

## Troubleshooting

- 401 Unauthorized in frontend: ensure the JWT is stored in `localStorage` (key `token`) and the backend `jwt.secret` matches what was used to sign the token.
- SMTP/email not sent: verify `BREVO_USERNAME`, `BREVO_PASSWORD`, and `BREVO_FROM_MAIL_ID` are set and that the SMTP relay permits your connections.
- Database errors: check `spring.datasource.url`, credentials, and that the DB server accepts connections from the app host.
- CORS errors: backend `SecurityConfig` allows origins by pattern `*`. If you still face issues, ensure `VITE_SERVER_URL` matches the frontend origin and restart the backend after config changes.

## Next steps / Suggested improvements

- Add integration and unit tests and enable CI (GitHub Actions).
- Add rate limiting and stronger brute-force protections for login.
- Add refresh tokens for safer long-lived sessions.
- Add role-based access control if multi-user roles are required.
- Add pagination on large transaction lists and server-side search indexing.

## Contributing

If you want to contribute, please fork the repo, create a feature branch, and open a pull request describing the change and why it is needed. Add tests for new functionality where possible.

## License

This project does not contain an explicit license file. If you want to apply a permissive license, consider adding an `LICENSE` file (for example, MIT). Until then, treat the code as proprietary or check with the project owner.

---

If you'd like, I can also:
- add a short `CONTRIBUTING.md` template,
- add example Postman collection or OpenAPI spec for the backend,
- generate a minimal `.env.example` for both backend and frontend with recommended variable names and sample values.

Tell me which follow-up you prefer and I'll add it to the repository.