## Sfico API – Backend (PT-BR)

API REST para controle financeiro pessoal, construída com Node.js, TypeScript, Express, Prisma e PostgreSQL. Permite cadastrar e gerenciar Receitas e Despesas, além de expor endpoints de resumo financeiro mensal e global.

Principais objetivos do backend:

- Centralizar regras de negócio de receitas/despesas
- Expor endpoints REST simples e previsíveis
- Calcular totais (mensal e global) com eficiência

## Funcionalidades

- CRUD de Despesas (Expenses)
- CRUD de Receitas (Incomes)
- Filtro por categoria e mês/ano (YYYY-MM)
- Resumo Financeiro (mensal e global)

## Stack e Ferramentas

- Node.js + Express
- TypeScript
- Prisma ORM (+ @prisma/client)
- PostgreSQL (recomendado via Docker)
- Dotenv para variáveis de ambiente
- Yup para validação

## Modelo de Dados (Prisma)

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

## Rotas (Resumo)

Despesas

- POST /expenses – criar
- GET /expenses – listar
- GET /expenses/:id – detalhar
- PUT /expenses/:id – atualizar
- DELETE /expenses/:id – remover
- GET /expenses/filter?categoria=x&data=YYYY-MM – filtrar

Receitas

- POST /incomes – criar
- GET /incomes – listar
- GET /incomes/:id – detalhar
- PUT /incomes/:id – atualizar
- DELETE /incomes/:id – remover
- GET /incomes/filter?categoria=x&data=YYYY-MM – filtrar

Resumo

- GET /summary – totais do mês atual (ou por data via query, se implementado)
- GET /summary/all – totais globais (receitas, despesas e saldo)

## Requisitos

- Node.js 18+
- Banco PostgreSQL (local ou via Docker Compose na raiz do monorepo)

## Variáveis de Ambiente

Crie um arquivo `.env` no diretório `Backend/` baseado em `.env.example`:

```
PORT=3080
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public"
```

## Como Executar (Local)

No diretório `Backend/`:

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

Servidor: http://localhost:3080

## Como Executar (Docker)

Há um `docker-compose.yml` na raiz do projeto com PostgreSQL. Suba o banco e rode a API localmente:

```bash
# na raiz do repositório
docker-compose up -d

# no diretório Backend/
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

Ou construa a imagem do Backend usando o `Dockerfile`:

```bash
docker build -t sfico-backend ./Backend
docker run -p 3080:3080 --env-file ./Backend/.env sfico-backend
```

## Scripts

- `npm run dev` – inicia em desenvolvimento (ts-node-dev)
- `npm run build` – compila TypeScript para `dist/`
- `npm run prisma:generate` – gera o Prisma Client
- `npm run prisma:migrate` – cria/aplica migração (dev)

## Estrutura de Pastas

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

## Notas

- Os valores monetários (`valor`) estão como `String` no schema atual. Garanta a formatação/conversão consistente no backend (por exemplo, usando `utils/helpers/formatValue.ts`).

---

Para README em inglês, veja `README-EN.md`.
