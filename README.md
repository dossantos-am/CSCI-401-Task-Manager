# CSCI-401-Task-Manager

Capstone project for **CSCI-401W Software Engineering**.  
This is a full-stack web application designed to function similarly to Apple Reminders.

---

## Frontend Setup

The frontend is built with React (Vite).

### 1. Navigate to the frontend folder

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

---

## Backend Setup

The backend is built with Spring Boot and uses PostgreSQL (Neon) with Flyway for database migrations.

### 1. Navigate to the backend folder

```bash
cd backend
```

### 2. Create your environment file

Copy the example file:

```bash
cp .env.example .env
```

Open `.env` and replace the placeholder with your Neon Java connection string:

```
DB_URL=jdbc:postgresql://username:password@your-neon-host.neon.tech/your-database?sslmode=require&channelBinding=require
```

You can find this in the Neon dashboard:

Project → Branch → Connect → Java (this is an option in the dropdown menu above the snippet window. Defualt is Connection string)

### 3. Run the backend

```bash
./mvnw clean spring-boot:run
```

---

## Database Migrations

We use **Flyway** to manage database schema changes.

Migration files are located in:

```
backend/src/main/resources/db/migration
```

Migration naming format:

```
V1__init.sql
V2__add_tasks_table.sql
V3__update_constraints.sql
```

## Important:

- Do NOT modify old migration files after they have been applied.
- Always create a new migration file for schema changes.
- Flyway automatically applies pending migrations on application startup.

---

## Security Notes

- The `.env` file is ignored by Git (.gitignore) and must NOT be committed.
- Only `.env.example` is committed to the repository.
- in application.properties: spring.datasource.url=${DB_URL} will reference your .env file's credentials. This is the DB_URL string found in the Neon console.
- Never commit real database credentials.