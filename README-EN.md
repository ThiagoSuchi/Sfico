# Sfico (Frontend + Backend)

Personal finance app (Incomes/Expenses/Summary) built as a study/learning project. This monorepo includes:

- Backend (REST API with Node.js/Express/Prisma/PostgreSQL)
- Frontend (Vite + TypeScript, Chart.js)

With Sfico you can record incomes and expenses, filter by month/category, paginate results, and visualize totals and charts in Global and Monthly views.

> Project created solely for learning purposes.

## Run everything with Docker Compose

Prerequisites: Docker and Docker Compose installed.

```bash
# At repository root
docker-compose up -d
```

Access:
- Frontend: http://localhost:3000
- Backend (API): http://localhost:3080
- PostgreSQL: port 5432 (container `sfico-db`)

To stop and remove containers:

```bash
docker-compose down
```

## Project-specific docs

- Backend: `Backend/README-EN.md` (and `Backend/README.md`)
- Frontend: `Frontend/README-EN.md` (and `Frontend/README.md`)
