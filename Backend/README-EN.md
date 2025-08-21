## Sfico API – Backend (EN)

REST API for personal finance management, built with Node.js, TypeScript, Express, Prisma, and PostgreSQL. It provides endpoints to manage Incomes and Expenses and to compute monthly and global summaries.

Backend goals:

- Centralize business rules for incomes/expenses
- Expose clean and predictable REST endpoints
- Compute monthly/global totals efficiently

## Features

- CRUD for Expenses
- CRUD for Incomes
- Filter by category and month/year (YYYY-MM)
- Financial Summary (monthly and global)

## Stack

- Node.js + Express
- TypeScript
- Prisma ORM (+ @prisma/client)
- PostgreSQL (recommended via Docker)
- Dotenv (env vars)
- Yup (validation)

## Data Model (Prisma)

```prisma
model Expense {
   id         String   @id @default(uuid())
   valor      String
   categoria  String
   descricao  String?
   data       DateTime
   createdAt  DateTime @default(now())
   updatedAt  DateTime @updatedAt
}

model Incomes {
   id         String   @id @default(uuid())
   valor      String
   categoria  String
   descricao  String?
   data       DateTime
   createdAt  DateTime @default(now())
   updatedAt  DateTime @updatedAt
}
```

## Routes (Summary)

Expenses

- POST /expenses – create
- GET /expenses – list
- GET /expenses/:id – detail
- PUT /expenses/:id – update
- DELETE /expenses/:id – remove
- GET /expenses/filter?categoria=x&data=YYYY-MM – filter

Incomes

- POST /incomes – create
- GET /incomes – list
- GET /incomes/:id – detail
- PUT /incomes/:id – update
- DELETE /incomes/:id – remove
- GET /incomes/filter?categoria=x&data=YYYY-MM – filter

Summary

- GET /summary – totals for the current month (or by query date if implemented)
- GET /summary/all – global totals (incomes, expenses, balance)

## Requirements

- Node.js 18+
- PostgreSQL (local or via root docker-compose)

## Environment Variables

Create a `.env` in `Backend/` from `.env.example`:

```
PORT=3080
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public"
```

## How to Run (Local)

In `Backend/` directory:

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

Server: http://localhost:3080

## How to Run (Docker)

There is a root `docker-compose.yml` with PostgreSQL. Start the DB and run the API locally:

```bash
# at repository root
docker-compose up -d

# then in Backend/
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

Or build the Backend image using `Dockerfile`:

```bash
docker build -t sfico-backend ./Backend
docker run -p 3080:3080 --env-file ./Backend/.env sfico-backend
```

## Scripts

- `npm run dev` – start in dev mode (ts-node-dev)
- `npm run build` – compile TypeScript to `dist/`
- `npm run prisma:generate` – generate Prisma Client
- `npm run prisma:migrate` – create/apply migration (dev)

## Folder Structure

```
src/
   config/
   controllers/
   interfaces/
   middlewares/
   repositories/
   routes/
   services/
   utils/
   app.ts
   server.ts
prisma/
   schema.prisma
   migrations/
```

## Notes

- Monetary values (`valor`) are stored as `String` in the current schema. Ensure consistent formatting/conversion in the backend (e.g., using `utils/helpers/formatValue.ts`).

  cd sfico-api

2. **Start the database using Docker Compose**

   ```bash
   docker-compose up -d
   ```

   This will create a PostgreSQL container on port 5432.

3. **Set up the environment**
   Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=3080
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"
   ```

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Generate Prisma client**

   ```bash
   npm run prisma:generate
   ```

6. **Run migrations (if not already done)**

   ```bash
   npm run prisma:migrate
   ```

7. **Start the server in development mode**
   ```bash
   npm run dev
   ```
   The server will run at http://localhost:3080

## Available Scripts

| Command                 | Description                        |
| ----------------------- | ---------------------------------- |
| npm run dev             | Starts the server with ts-node-dev |
| npm run build           | Compiles the TypeScript project    |
| npm run prisma:generate | Generates Prisma clients           |
| npm run prisma:migrate  | Runs Prisma migrations             |

## Project Structure

```bash
src/
├── config/            # Configurations (Prisma, env)
├── controllers/       # Controllers layer
├── interfaces/        # DTOs
├── middleware/        # Middlewares (auth, async handler)
├── repositories/      # Database access via Prisma
├── routes/            # Routing files
├── services/          # Business logic
├── utils/             # Helpers and validators
├── app.ts             # App configuration
└── server.ts          # Entry point
```

## License

This project is free to use for educational and learning purposes.
