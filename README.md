
# Sfico – Sua Finança Controlada

Sfico é uma API REST desenvolvida em Node.js com TypeScript, Express, Prisma ORM e PostgreSQL, voltada para o controle financeiro pessoal. A aplicação permite que o usuário registre seus gastos, visualize resumos mensais, filtre por categoria/data e gerencie seu cadastro de forma segura.

---

## Funcionalidades

- Registro de usuário e autenticação com JWT
- Criação de gastos financeiros
- Listagem e filtro de gastos por data e categoria
- Atualização e exclusão de gastos
- Resumo total mensal dos gastos

---

## Telas associadas (Frontend)

Embora este repositório contenha apenas a **API (backend)**, a lógica cobre as seguintes telas em uma possível aplicação frontend:

- Tela de **Login**
- Tela de **Cadastro**
- Tela de **Gastos**
- Tela de **Resumo**

---

## Modelo de Dados

### Entidade: Expense (Gasto)

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

## Rotas da Aplicação

| Método | Rota                                 | Ação                        | Tela associada      |
|--------|--------------------------------------|-----------------------------|---------------------|
| POST   | /auth/register                       | Registrar novo usuário      | Tela de Cadastro    |
| POST   | /auth/login                          | Login do usuário (JWT)      | Tela de Login       |
| POST   | /expenses                            | Criar novo gasto            | Tela de Gastos      |
| GET    | /expenses                            | Listar todos os gastos      | Tela de Gastos      |
| GET    | /expenses/:id                        | Buscar gasto por ID         | Tela de Gastos      |
| PUT    | /expenses/:id                        | Atualizar um gasto          | Tela de Gastos      |
| DELETE | /expenses/:id                        | Deletar um gasto            | Tela de Gastos      |
| GET    | /summary/monthly                     | Ver total mensal            | Tela de Resumo      |
| GET    | /expenses?categoria=x&data=yyyy-mm   | Filtrar por categoria e mês | Tela de Gastos      |

---

## Tecnologias Utilizadas

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL (via Docker)
- JWT para autenticação
- Yup para validação de dados
- bcryptjs para hash de senha
- Docker e docker-compose

---

## Como executar o projeto

### Pré-requisitos
- Node.js 18+
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
   DATABASE_URL=postgresql://docker:docker@localhost:5432/postgres
   JWT_SECRET=sua_chave_secreta
   ```

4. **Instale as dependências**
   ```bash
   npm install
   ```

5. **Gere o client do Prisma**
   ```bash
   npm run build:prisma
   ```

6. **Rode as migrações (se ainda não fez)**
   ```bash
   npx prisma migrate dev --name init
   ```

7. **Inicie o servidor em modo dev**
   ```bash
   npm run dev
   ```
   Servidor rodando em http://localhost:3080

---

## Scripts disponíveis

| Comando            | Descrição                        |
|--------------------|----------------------------------|
| npm run dev        | Inicia o servidor com ts-node-dev|
| npm run build      | Compila o projeto TypeScript     |
| npm run build:prisma| Gera os clients do Prisma        |

---

## Estrutura de Pastas

```bash
src/
├── config/            # Configurações (Prisma, env)
├── controllers/       # Camada de Controllers
├── middleware/        # Middlewares (auth, async handler)
├── repositories/      # Acesso ao banco via Prisma
├── routes/            # Arquivos de rotas
├── services/          # Regras de negócio
├── types/             # DTOs
├── utils/             # Helpers e validadores
├── app.ts             # Configuração da aplicação
└── server.ts          # Arquivo principal
```

---

## Autenticação
A autenticação é feita via JWT. Após o login, o token deve ser enviado no header das requisições protegidas:


---

## Licença
Projeto livre para fins de estudo e aprendizado.
