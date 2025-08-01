

# Sfico – Sua Finança Controlada

Sfico é uma API REST desenvolvida em Node.js com TypeScript, Express, Prisma ORM e PostgreSQL, voltada para o controle financeiro pessoal. A aplicação permite que o usuário registre **gastos** e **receitas**, visualize resumos mensais, filtre por categoria/data e mantenha o controle do seu saldo.

---


## Funcionalidades

- Criação de gastos financeiros (despesas)
- Criação de receitas financeiras
- Listagem e filtro de gastos e receitas por data e categoria
- Atualização e exclusão de gastos e receitas
- Resumo total, e resumo mensal dos gastos e receitas

---


## Telas associadas (Frontend)

Embora este repositório contenha apenas a **API (backend)**, a lógica cobre as seguintes telas em uma possível aplicação frontend:

- Tela de **Gastos**
- Tela de **Receitas**
- Tela de **Resumo**

---


## Modelo de Dados

### Entidade: Expense (Despesa)
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

### Entidade: Incomes (Receita)
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

---


## Rotas da Aplicação

### Despesas
| Método | Rota                                      | Ação                        | Tela associada      |
|--------|-------------------------------------------|-----------------------------|---------------------|
| POST   | /expenses                                 | Criar novo gasto            | Tela de Gastos      |
| GET    | /expenses                                 | Listar todos os gastos      | Tela de Gastos      |
| GET    | /expenses/:id                             | Buscar gasto por ID         | Tela de Gastos      |
| PUT    | /expenses/:id                             | Atualizar um gasto          | Tela de Gastos      |
| DELETE | /expenses/:id                             | Deletar um gasto            | Tela de Gastos      |
| GET    | /expenses/filter?categoria=x&data=mm/yyyy | Filtrar por categoria e mês | Tela de Gastos      |

### Receitas
| Método | Rota                                     | Ação                            | Tela associada      |
|--------|------------------------------------------|---------------------------------|---------------------|
| POST   | /incomes                                 | Criar nova receita              | Tela de Receitas    |
| GET    | /incomes                                 | Listar todas as receitas        | Tela de Receitas    |
| GET    | /incomes/:id                             | Buscar receita por ID           | Tela de Receitas    |
| PUT    | /incomes/:id                             | Atualizar uma receita           | Tela de Receitas    |
| DELETE | /incomes/:id                             | Deletar uma receita             | Tela de Receitas    |
| GET    | /incomes/filter?categoria=x&data=mm/yyyy | Filtrar por categoria e mês     | Tela de Receitas    |

### Resumo
| Método | Rota                                 | Ação                             | Tela associada      |
|--------|--------------------------------------|----------------------------------|---------------------|
| GET    | /summary                             | Ver total de despesas mensal     | Tela de Resumo      |
| GET    | /summary/all                         | Total de receitas e despesas     | Tela de Resumo      |

---


## Tecnologias Utilizadas

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL (via Docker)
- Yup para validação de dados
- Docker e docker-compose

---


## Como executar o projeto

### Pré-requisitos
- Node.js
- Docker e Docker Compose

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/sfico-api.git
   cd sfico-api
   ```
2. **Suba o banco de dados com Docker Compose**
   ```bash
   docker-compose up -d
   ```
   Isso criará um container PostgreSQL na porta 5432.

3. **Configure o ambiente**
   Crie um arquivo `.env` na raiz com as variáveis:
   ```env
   PORT=3080
   DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO?schema=public"
   ```

4. **Instale as dependências**
   ```bash
   npm install
   ```

5. **Gere o client do Prisma**
   ```bash
   npm run prisma:generate
   ```

6. **Rode as migrações (se ainda não fez)**
   ```bash
   npm run prisma:migrate
   ```

7. **Inicie o servidor em modo dev**
   ```bash
   npm run dev
   ```
   Servidor rodando em http://localhost:3080

---


## Scripts disponíveis

| Comando                 | Descrição                        |
|-------------------------|----------------------------------|
| npm run dev             | Inicia o servidor com ts-node-dev|
| npm run build           | Compila o projeto TypeScript     |
| npm run prisma:generate | Gera os clients do Prisma        |
| npm run prisma:migrate  | Executa as migrações do Prisma   |

---


## Estrutura de Pastas

```bash
src/
├── config/            # Configurações (Prisma, env)
├── controllers/       # Camada de Controllers
├── interfaces/        # DTOs
├── middleware/        # Middlewares (auth, async handler)
├── repositories/      # Acesso ao banco via Prisma
├── routes/            # Arquivos de rotas
├── services/          # Regras de negócio
├── utils/             # Helpers e validadores
├── app.ts             # Configuração da aplicação
└── server.ts          # Arquivo principal
```


---

## Licença
Projeto livre para fins de estudo e aprendizado.
