# Sfico (Frontend + Backend)

Aplicação de controle financeiro pessoal (Receitas/Despesas/Resumo) construída para fins de estudo e aprendizado. O monorepo contém:

- Backend (API REST com Node.js/Docker/Express/Prisma/PostgreSQL)
- Frontend (Vite + TypeScript, Chart.js)

Com o Sfico você registra receitas e despesas, filtra por mês/categoria, pagina, resultados e visualiza totais e gráficos nas visões Global e Mensal.

> Projeto criado exclusivamente para aprendizado.

## Executar tudo com Docker Compose

Pré-requisitos: Docker e Docker Compose instalados.

```bash
# Na raiz do repositório
docker-compose up -d
```

Acesse:
- Frontend: http://localhost:3000
- Backend (API): http://localhost:3080
- PostgreSQL: porta 5432 (container `sfico-db`)

Para parar e remover os containers:

```bash
docker-compose down
```

## Documentação específica

- Backend: `Backend/README.md`
- Frontend: `Frontend/README.md`
