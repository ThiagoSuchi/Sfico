
# Sfico – Your Finances Under Control

Sfico is a REST API built with Node.js, TypeScript, Express, Prisma ORM, and PostgreSQL. It's designed for personal finance management, allowing users to record their expenses, view monthly summaries, and filter data by category or date.

## Features

- Create financial expenses
- List and filter expenses by date and category
- Update and delete expenses
- Monthly total expense summary

## Associated Screens (Frontend)

Although this repository contains only the API (backend), the logic supports the following screens in a possible frontend application:

- Expenses Screen
- Summary Screen

## Data Model

**Entity: Expense**
```prisma
model Expense {
  id         String   @id @default(uuid())
  valor      Float
  categoria  String
  descricao  String?
  data       DateTime
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

## API Routes

| Method | Route                             | Action                         | Associated Screen |
|--------|-----------------------------------|--------------------------------|-------------------|
| POST   | /expenses                         | Create a new expense           | Expenses Screen   |
| GET    | /expenses                         | List all expenses              | Expenses Screen   |
| GET    | /expenses/:id                     | Get expense by ID              | Expenses Screen   |
| PUT    | /expenses/:id                     | Update an expense              | Expenses Screen   |
| DELETE | /expenses/:id                     | Delete an expense              | Expenses Screen   |
| GET    | /expenses?categoria=x&data=yyyy-mm| Filter by category and month   | Expenses Screen   |
| GET    | /summary/monthly                  | Get monthly total summary      | Summary Screen    |

## Technologies Used

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL (via Docker)
- Yup for data validation
- Docker and Docker Compose

## How to Run the Project

### Prerequisites

- Node.js
- Docker and Docker Compose

### Clone the repository

```bash
git clone https://github.com/your-username/sfico-api.git
cd sfico-api
```

### Start the database using Docker Compose

```bash
docker-compose up -d
```

This will create a PostgreSQL container on port 5432.

### Set up the environment

Create a `.env` file in the root directory with the following content:

```env
DATABASE_URL=postgresql://docker:docker@localhost:5432/postgres
JWT_SECRET=your_secret_key
```

### Install dependencies

```bash
npm install
```

### Generate Prisma client

```bash
npm run build:prisma
```

### Run migrations (if not already done)

```bash
npx prisma migrate dev --name init
```

### Start the server in development mode

```bash
npm run dev
```

The server will run at http://localhost:3080

## Available Scripts

| Command             | Description                        |
|---------------------|------------------------------------|
| npm run dev         | Starts the server with ts-node-dev |
| npm run build       | Compiles the TypeScript project    |
| npm run build:prisma| Generates Prisma clients           |

## Project Structure

```bash
src/
├── config/            # Configurations (Prisma, env)
├── controllers/       # Controllers layer
├── interfaces/        # DTOs
├── middleware/        # Middleware (auth, async handler)
├── repositories/      # Database access via Prisma
├── routes/            # Routing files
├── services/          # Business logic
├── utils/             # Helpers and validators
├── app.ts             # App configuration
└── server.ts          # Entry point
```

## License

This project is free to use for educational and learning purposes.