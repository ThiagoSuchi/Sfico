import Expenses from "../api/Expense";
import type { Expense } from "../model/IncomeExpenseModel";
import { listItem } from "../utils/render/listItemFunc";
import { notItem } from "../utils/render/notItemDOM";

export class ManagerExpenses {
    private divItems = document.querySelector('.item-expense')! as HTMLDivElement;
    private expense = Expenses;

    constructor() {
        this.getAllExpense()
    }

    async getAllExpense(): Promise<Expense[]> {
        const data = await this.expense.getAllExpense();
        
        if (!data || !Array.isArray(data)) {
            notItem('Nenhuma receita criada.', this.divItems);
            return [];
        }

        // Lista todos os expenses que tem no banco
        listItem(data, this.divItems);

        return data;
    }
}