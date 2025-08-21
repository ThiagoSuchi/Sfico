## Sfico – Frontend (PT-BR)

Aplicação web (Vite + TypeScript) que consome a Sfico API para controle financeiro pessoal. Permite cadastrar/gerenciar Receitas e Despesas, aplicar filtros por mês e categoria, paginar resultados e visualizar resumos em gráficos (Chart.js) nas visões Global e Mensal.

### Principais objetivos do Frontend

- Oferecer uma UI simples e responsiva para registrar e consultar receitas/despesas
- Aplicar filtros por categoria e mês/ano e paginar os resultados
- Exibir totais e gráficos atualizados conforme os dados mudam

## Recursos

- Navegação entre Receitas, Despesas e Resumo Financeiro
- CRUD via API para receitas/despesas (criar, listar, atualizar, excluir)
- Filtros por categoria e mês/ano (YYYY-MM) e paginação
- Resumo Global e Mensal com gráficos (Chart.js: barras e pizza)
- Atualização dos totais/gráficos quando os dados mudam (eventos internos de "dataChanged")
- Layout responsivo com menu hambúrguer no mobile

## Stack

- Vite + TypeScript
- Axios (consumo de API)
- Chart.js (gráficos)

## Requisitos

- Node.js 18+ (recomendado 20+)
- Backend em execução (padrão: http://localhost:3080)

## Executar localmente

No diretório `Frontend/`:

```bash
npm install
npm run dev
```

Aplicação: http://localhost:3000

Observação: o Frontend aponta por padrão para `http://localhost:3080` (veja `src/api/config.ts`). Se seu Backend estiver em outro host/porta, ajuste o `baseURL` nesse arquivo.

## Build e Preview

Gere os arquivos estáticos de produção e faça o preview local:

```bash
npm run build
npm run preview
```

Os artefatos serão gerados em `dist/`.

## Executar com Docker

Opção 1 – Usando apenas o Dockerfile do Frontend:

```bash
docker build -t sfico-frontend ./Frontend
docker run -p 3000:3000 sfico-frontend
```

Opção 2 – Usando `docker-compose.yml` na raiz (sobe Backend, Frontend e Postgres):

```bash
# Na raiz do repositório
docker-compose up -d
```

Frontend: http://localhost:3000 • Backend: http://localhost:3080

## Configuração do Backend (API)

- Arquivo: `src/api/config.ts`
- Padrão:

```ts
const api = axios.create({
  baseURL: 'http://localhost:3080',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
})
```

Altere `baseURL` caso a API esteja em outro endereço. Em ambientes Docker usando o `docker-compose` deste projeto, acessar pelo navegador em `http://localhost:3000` → as requisições irão para `http://localhost:3080` (mapeadas pelo compose).

## Estrutura de pastas (resumo)

```
Frontend/
  index.html
  src/
    main.ts
    components/
      ApplicationSfico.ts      # Bootstrap da aplicação (lazy-load dos managers)
    services/
      ManagerNavigation.ts     # Navegação entre seções
      ManagerMobileMenu.ts     # Menu mobile (hambúrguer)
      ManagerIncomes.ts        # UI/fluxo de Receitas
      ManagerExpenses.ts       # UI/fluxo de Despesas
      ManagerChartGlobal.ts    # Gráficos visão Global
      ManagerChartMonthly.ts   # Gráficos visão Mensal
      ManagerSummary.ts        # Totais do resumo
    api/
      config.ts                # Axios (baseURL da API)
      Incomes.ts, Expense.ts, Summary.ts
    model/                     # Tipos/DTOs (TypeScript)
    utils/
      render/                  # Render de listas, totais e paginação
      filters/                 # Utilidades de filtro
    styles/
      incomesAndExpense.css
      menu.css
      newItems.css
      summaryTotal.css
  public/
    icon/  logo/
```

## Scripts disponíveis

- `npm run dev` – servidor de desenvolvimento (Vite)
- `npm run build` – build de produção (Vite + tsc)
- `npm run preview` – serve o build localmente

## Notas

- Certifique-se de que a API (Backend) esteja acessível a partir do navegador no endereço configurado em `src/api/config.ts`.
- Os gráficos dependem dos dados retornados pela API; ao criar/editar/excluir itens, os totais e gráficos são atualizados.

---

Para README em inglês, veja `README-EN.md`.
