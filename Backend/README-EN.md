
# Sfico – Your Finances Under Control

Sfico is a REST API built with Node.js, TypeScript, Express, Prisma ORM, and PostgreSQL, focused on personal finance management. The application allows users to record **expenses** and **incomes**, view monthly summaries, filter by category/date, and keep track of their balance.


## Features

- Create financial expenses (expenses)
- Create financial incomes
- List and filter expenses and incomes by date and category
- Update and delete expenses and incomes
- Total and monthly summary of expenses and incomes


## Associated Screens (Frontend)

Although this repository contains only the **API (backend)**, the logic covers the following screens in a possible frontend application:

- **Expenses Screen**
- **Incomes Screen**
- **Summary Screen**


## Data Model

### Entity: Expense
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

### Entity: Incomes
```prisma
model Incomes {
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

### Expenses
| Method | Route                                      | Action                        | Associated Screen   |
|--------|--------------------------------------------|-------------------------------|---------------------|
| POST   | /expenses                                 | Create a new expense          | Expenses Screen     |
| GET    | /expenses                                 | List all expenses             | Expenses Screen     |
| GET    | /expenses/:id                             | Get expense by ID             | Expenses Screen     |
| PUT    | /expenses/:id                             | Update an expense             | Expenses Screen     |
| DELETE | /expenses/:id                             | Delete an expense             | Expenses Screen     |
| GET    | /expenses/filter?categoria=x&data=mm/yyyy | Filter by category and month  | Expenses Screen     |

### Incomes
| Method | Route                                     | Action                            | Associated Screen   |
|--------|-------------------------------------------|-----------------------------------|---------------------|
| POST   | /incomes                                 | Create a new income               | Incomes Screen      |
| GET    | /incomes                                 | List all incomes                  | Incomes Screen      |
| GET    | /incomes/:id                             | Get income by ID                  | Incomes Screen      |
| PUT    | /incomes/:id                             | Update an income                  | Incomes Screen      |
| DELETE | /incomes/:id                             | Delete an income                  | Incomes Screen      |
| GET    | /incomes/filter?categoria=x&data=mm/yyyy | Filter by category and month      | Incomes Screen      |

### Summary
| Method | Route                                 | Action                             | Associated Screen   |
|--------|----------------------------------------|------------------------------------|---------------------|
| GET    | /summary                              | View monthly expenses total        | Summary Screen      |
| GET    | /summary/all                          | Total of incomes and expenses      | Summary Screen      |


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

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sfico-api.git
   cd sfico-api
   ```
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
|-------------------------|------------------------------------|
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