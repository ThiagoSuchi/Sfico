import { fetchAllItems } from "./fetchAllItems";

export async function totalGlobal() {
    const totalIncomes = document.querySelector('.total-incomes-global') as HTMLDivElement;
    const totalExpense = document.querySelector('.total-expense-global') as HTMLDivElement;
    const balance = document.querySelector('.balance-global') as HTMLDivElement;

    const format = (n: number) => n.toFixed(2).replace('.', ',');

    let { incomeResult, expenseResult, balanceResult } = await fetchAllItems();

    // Tratar undefined/null como 0, mas preservar 0 como valor válido
    incomeResult = (typeof incomeResult === 'number' && Number.isFinite(incomeResult)) ? incomeResult : 0;
    expenseResult = (typeof expenseResult === 'number' && Number.isFinite(expenseResult)) ? expenseResult : 0;
    balanceResult = (typeof balanceResult === 'number' && Number.isFinite(balanceResult)) ? balanceResult : 0;

    if (totalIncomes) {
        totalIncomes.innerHTML = '';
        const h1 = document.createElement('h1');
        h1.textContent = `R$ ${format(incomeResult)}`;
        totalIncomes.appendChild(h1);
    }

    if (totalExpense) {
        totalExpense.innerHTML = '';
        const h1 = document.createElement('h1');
        h1.textContent = `R$ ${format(expenseResult)}`;
        totalExpense.appendChild(h1);
    }

    if (balance) {
        balance.innerHTML = '';
        const h1 = document.createElement('h1');
        h1.textContent = `R$ ${format(balanceResult)}`;
        balance.appendChild(h1);
    }
};

export async function totalMonthly() {
    const totalIncomes = document.querySelector('.total-incomes-month') as HTMLDivElement;
    const totalExpense = document.querySelector('.total-expense-month') as HTMLDivElement;
    const balance = document.querySelector('.balance-month') as HTMLDivElement;


    let { incomeResultFilter, expenseResultFilter, balanceFilter } = await fetchAllItems();

    const format = (n: number) => n.toFixed(2).replace('.', ',');

    incomeResultFilter = (typeof incomeResultFilter === 'number' && Number.isFinite(incomeResultFilter)) ? incomeResultFilter : 0;
    expenseResultFilter = (typeof expenseResultFilter === 'number' && Number.isFinite(expenseResultFilter)) ? expenseResultFilter : 0;
    balanceFilter = (typeof balanceFilter === 'number' && Number.isFinite(balanceFilter)) ? balanceFilter : 0;

    if (totalIncomes) {
        totalIncomes.innerHTML = '';
        const h1 = document.createElement('h1');
        h1.textContent = `R$ ${format(incomeResultFilter)}`;
        totalIncomes.appendChild(h1);
    }

    if (totalExpense) {
        totalExpense.innerHTML = '';
        const h1 = document.createElement('h1');
        h1.textContent = `R$ ${format(expenseResultFilter)}`;
        totalExpense.appendChild(h1);
    }

    if (balance) {
        balance.innerHTML = '';
        const h1 = document.createElement('h1');
        h1.textContent = `R$ ${format(balanceFilter)}`;
        balance.appendChild(h1);
    }


    // Atualiza automaticamente ao mudar o input month/Year
    const monthInput = document.getElementById('summ-monthYear') as HTMLInputElement | null;
    if (monthInput) {
        let timer: number | null = null;

        monthInput.onchange = () => {
            if (timer) window.clearTimeout(timer);
            timer = window.setTimeout(() => {
                // atualiza resumo mensal e global
                totalMonthly().catch(console.error);
                totalGlobal().catch(console.error);

                // notifica managers que dependem de dados para atualizar (gráficos)
                window.dispatchEvent(new CustomEvent('dataChanged', { detail: { context: 'summary' } }));
            }, 150);
        };
    }

};