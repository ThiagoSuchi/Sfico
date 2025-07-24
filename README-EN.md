# Sfico – Your Finances Under Control

Sfico is a REST API developed with Node.js, TypeScript, Express, Prisma ORM, and PostgreSQL, focused on personal financial management. The application allows users to register expenses, view monthly summaries, filter by category/date, and securely manage their account.

---

## Features

- User registration and authentication with JWT
- Creation of financial expenses
- Listing and filtering expenses by date and category
- Updating and deleting expenses
- Monthly expense summary

---

## Associated Screens (Frontend)

Although this repository contains only the **API (backend)**, the logic covers the following screens in a possible frontend application:

- **Login** screen
- **Register** screen
- **Expenses** screen
- **Summary** screen

---

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

---

## Application Routes

| Method | Route                                 | Action                        | Associated Screen   |
|--------|---------------------------------------|-------------------------------|---------------------|
| POST   | /auth/register                        | Register new user             | Register screen     |
| POST   | /auth/login                           | User login (JWT)              | Login screen        |
| POST   | /expenses                             | Create new expense            | Expenses screen     |
| GET    | /expenses                             | List all expenses             | Expenses screen     |
| GET    | /expenses/:id                         | Get expense by ID             | Expenses screen     |
| PUT    | /expenses/:id                         | Update an expense             | Expenses screen     |
| DELETE | /expenses/:id                         | Delete an expense             | Expenses screen     |
| GET    | /summary/monthly                      | View monthly summary          | Summary screen      |
| GET    | /expenses?categoria=x&data=yyyy-mm    | Filter by category and month  | Expenses screen     |

---

## Technologies Used

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL (via Docker)
- JWT for authentication
- Zod for data validation
- bcryptjs for password hashing
- Docker and docker-compose

---

## How to Run the Project

### Prerequisites
- Node.js 18+
- Docker and Docker Compose

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sfico-api.git
   cd sfico-api
   ```
2. **Start the database with Docker Compose**
   ```bash
   docker-compose up -d
   ```
   This will create a PostgreSQL container on port 5432.

3. **Configure the environment**
   Create a `.env` file in the root with the following variables:
   ```env
   DATABASE_URL=postgresql://docker:docker@localhost:5432/postgres
   JWT_SECRET=your_secret_key
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Generate Prisma client**
   ```bash
   npm run build:prisma
   ```

6. **Run migrations (if not done yet)**
   ```bash
   npx prisma migrate dev --name init
   ```

7. **Start the server in dev mode**
   ```bash
   npm run dev
   ```
   Server running at http://localhost:3000

---

## Available Scripts

| Command             | Description                        |
|---------------------|------------------------------------|
| npm run dev         | Starts the server with ts-node-dev |
| npm run build       | Compiles the TypeScript project    |
| npm run build:prisma| Generates Prisma clients           |

---

## Folder Structure

```bash
src/
├── config/            # Configurations (Prisma, env)
├── controllers/       # Controllers layer
├── middleware/        # Middlewares (auth, async handler)
├── repositories/      # Database access via Prisma
├── routes/            # Route files
├── services/          # Business logic
├── types/             # DTOs
├── utils/             # Helpers and validators
├── app.ts             # Application setup
└── server.ts          # Main file
```

---

## Authentication
Authentication is done via JWT. After login, the token must be sent in the header of protected requests:

---

## License
Project free for study and learning purposes.
