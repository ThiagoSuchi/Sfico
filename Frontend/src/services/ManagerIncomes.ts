import Incomes from "../api/Incomes";
import type { Income } from "../model/IncomeExpenseModel";
import { listItem } from "../utils/render/listItemFunc";
import { notItem } from "../utils/render/notItemDOM";

export class ManagerIncomes {
    private divItems = document.querySelector('.item-income')! as HTMLDivElement;
    private income = Incomes;

    constructor() {
        this.getAllIncomes()
    }

    async getAllIncomes(): Promise<Income[]> {
        const data = await this.income.getAllIncomes();
        
        if (!data || !Array.isArray(data)) {
            notItem('Nenhuma receita criada.', this.divItems);
            return [];
        }

        // Lista todos os incomes que tem no banco
        listItem(data, this.divItems);

        return data;
    }
}