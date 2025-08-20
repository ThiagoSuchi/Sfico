// import { fetchAllItems } from "./fetchAllItems";

// export async function totalGlobal() {
//     const totalIncomes = document.querySelector('.total-incomes-global') as HTMLDivElement;
//     const totalExpense = document.querySelector('.total-expense-global') as HTMLDivElement;
//     const balance = document.querySelector('.balance-global') as HTMLDivElement;

//     const format = (n: number) => n.toFixed(2).replace('.', ',');

//     if (totalIncomes) {
//         totalIncomes.innerHTML = '';
//         const h1 = document.createElement('h1');
//         h1.textContent = `R$ ${format(incResult)}`;
//         totalIncomes.appendChild(h1);
//     }

//     if (totalExpense) {
//         totalExpense.innerHTML = '';
//         const h1 = document.createElement('h1');
//         h1.textContent = `R$ ${format(expResult)}`;
//         totalExpense.appendChild(h1);
//     }

//     if (balance) {
//         balance.innerHTML = '';
//         const h1 = document.createElement('h1');
//         h1.textContent = `R$ ${format(incResult - expResult)}`;
//         balance.appendChild(h1);
//     }
// };

// export async function totalMonthly() {
//     const totalIncomes = document.querySelector('.total-incomes-month') as HTMLDivElement;
//     const totalExpense = document.querySelector('.total-expense-month') as HTMLDivElement;
//     const balance = document.querySelector('.balance-month') as HTMLDivElement;

//     const { incResultFilter, expResultFilter } = await fetchAllItems();

//     const format = (n: number) => n.toFixed(2).replace('.', ',');

//     if (totalIncomes) {
//         totalIncomes.innerHTML = '';
//         const h1 = document.createElement('h1');
//         h1.textContent = `R$ ${format(incResultFilter)}`;
//         totalIncomes.appendChild(h1);
//     }

//     if (totalExpense) {
//         totalExpense.innerHTML = '';
//         const h1 = document.createElement('h1');
//         h1.textContent = `R$ ${format(expResultFilter)}`;
//         totalExpense.appendChild(h1);
//     }

//     if (balance) {
//         balance.innerHTML = '';
//         const h1 = document.createElement('h1');
//         h1.textContent = `R$ ${format(incResultFilter - expResultFilter)}`;
//         balance.appendChild(h1);
//     }
// };