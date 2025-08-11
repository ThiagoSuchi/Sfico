//src/services/ManagerIncomes.ts

import Incomes from "../api/Incomes";
import { listItem, createItem } from "../utils/render/managerItemsFunc";
import { notItem } from "../utils/render/notItemDOM";
import { paginateItems } from "../utils/render/paginationDOM";

export class ManagerIncomes {
    private divItems = document.querySelector('.item-income')! as HTMLDivElement;
    private income = Incomes;

    private currentPage = 1;
    private skip = 0;
    private perPage = 7;

    constructor() {
        this.setupPaginationListener();// Escuta eventos de mudança da página
        this.getAllIncomes()
        this.createIncome()
    }

    private setupPaginationListener() {
        window.addEventListener('pageChanged', (e: Event) => {
            const { page, skip } = (e as CustomEvent).detail;

            this.currentPage = page;
            this.skip = skip;

            // Recarrega os dados da nova página
            this.getAllIncomes();
        })
    }

    async createIncome() {
        const btnNewIncome = document.getElementById('btn-newReceita') as HTMLButtonElement;
        const divNewIncome = document.querySelector('.new-income') as HTMLDivElement;
        const btnCreate = document.querySelector('.create') as HTMLButtonElement;

        const income = await createItem(btnCreate, btnNewIncome, divNewIncome);

        console.log(income);

        await this.income.createIncomes(income);

       this.getAllIncomes()
    }

    async getAllIncomes() {
        const data = await this.income.getAllIncomes(this.skip, this.perPage);

        if (!data || !data.incomes || data.incomes.length === 0) {
            notItem('Nenhuma receita criada.', this.divItems);
            return undefined;
        }

        paginateItems(this.currentPage, data.pages, this.perPage)

        // Lista todos os incomes que tem no banco
        listItem(data.incomes, this.divItems);

        return data;
    }


}