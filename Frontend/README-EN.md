## Sfico – Frontend (EN)

Web application (Vite + TypeScript) that consumes the Sfico API for personal finance control. It lets you create/manage Incomes and Expenses, apply month/category filters, paginate, and visualize summaries with charts (Chart.js) in Global and Monthly views.

### Frontend goals

- Provide a simple, responsive UI to record and browse incomes/expenses
- Apply filters by category and month/year and paginate results
- Show totals and charts that update as data changes

## Features

- Navigation between Incomes, Expenses, and Financial Summary
- CRUD via API for incomes/expenses (create, list, update, delete)
- Filters by category and month/year (YYYY-MM) and pagination
- Global and Monthly summaries with charts (Chart.js: bar and pie)
- Totals/charts auto-update when data changes (internal "dataChanged" events)
- Responsive layout with mobile hamburger menu

## Stack

- Vite + TypeScript
- Axios (API consumption)
- Chart.js (charts)

## Requirements

- Node.js 18+ (20+ recommended)
- Backend running (default: http://localhost:3080)

## Run locally

From `Frontend/`:

```bash
npm install
npm run dev
```

App: http://localhost:3000

Note: the Frontend points to `http://localhost:3080` by default (see `src/api/config.ts`). If your Backend runs elsewhere, change the `baseURL` in that file.

## Build and Preview

Generate production assets and preview locally:

```bash
npm run build
npm run preview
```

Artifacts will be generated in `dist/`.

## Run with Docker

Option 1 – Using only the Frontend Dockerfile:

```bash
docker build -t sfico-frontend ./Frontend
docker run -p 3000:3000 sfico-frontend
```

Option 2 – Using the root `docker-compose.yml` (brings up Backend, Frontend and Postgres):

```bash
# At repository root
docker-compose up -d
```

Frontend: http://localhost:3000 • Backend: http://localhost:3080

## Backend (API) configuration

- File: `src/api/config.ts`
- Default:

```ts
const api = axios.create({
  baseURL: 'http://localhost:3080',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
})
```

Change `baseURL` if the API lives elsewhere. In Docker setups using this project's `docker-compose`, browsing `http://localhost:3000` will send requests to `http://localhost:3080` (mapped by compose).

## Folder structure (overview)

```
Frontend/
  index.html
  src/
    main.ts
    components/
      ApplicationSfico.ts      # App bootstrap (lazy-loads managers)
    services/
      ManagerNavigation.ts     # Section navigation
      ManagerMobileMenu.ts     # Mobile menu (hamburger)
      ManagerIncomes.ts        # Incomes UI/flow
      ManagerExpenses.ts       # Expenses UI/flow
      ManagerChartGlobal.ts    # Global charts
      ManagerChartMonthly.ts   # Monthly charts
      ManagerSummary.ts        # Summary totals
    api/
      config.ts                # Axios (API baseURL)
      Incomes.ts, Expense.ts, Summary.ts
    model/                     # Types/DTOs (TypeScript)
    utils/
      render/                  # Rendering helpers (lists, totals, pagination)
      filters/                 # Filter utilities
    styles/
      incomesAndExpense.css
      menu.css
      newItems.css
      summaryTotal.css
  public/
    icon/  logo/
```

## Available scripts

- `npm run dev` – development server (Vite)
- `npm run build` – production build (Vite + tsc)
- `npm run preview` – serve the build locally

## Notes

- Ensure the API (Backend) is reachable from the browser at the address configured in `src/api/config.ts`.
- Charts depend on API data; when you create/update/delete items, totals and charts are updated accordingly.

---

Para README em português, veja `README.md`.
