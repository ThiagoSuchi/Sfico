//src/services/ManagerIncomes.ts

import axios, { AxiosError } from "axios";
import Incomes from "../api/Incomes";
import { clearFormErrors, formErrors } from "../utils/Errors/formErrorsDOM";
import { listItem, createItem, deleteItem } from "../utils/render/managerItemsFunc";
import { modelItemCreatedOrDelete } from "../utils/render/modelItemCreate";
import { notItem } from "../utils/render/notItemDOM";
import { paginateItems } from "../utils/render/paginationDOM";

export class ManagerIncomes {
    private divItems = document.querySelector('.item-income')! as HTMLDivElement;
    private income = Incomes;

    // Cache de dados atuais
    private currentData: any = null;

    private currentPage = 1;
    private skip = 0;
    private perPage = 7;

    constructor() {
        // Escuta eventos de mudança da página
        this.setupPaginationListener();
        this.createIncome();
        this.getAllIncomes();
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

    private setupDeleteListener() {
        if (!this.currentData) return;

        deleteItem(this.divItems, async (index) => {
            await this.deleteIncomeById(index);
        })
    }

    async createIncome() {
        const btnNewIncome = document.getElementById('btn-newReceita') as HTMLButtonElement;
        const divNewIncome = document.querySelector('.new-income') as HTMLDivElement;
        const btnCreate = document.querySelector('.create') as HTMLButtonElement;
        const overlay = document.getElementById('new-item-overlay') as HTMLDivElement;

        createItem(btnCreate, btnNewIncome, divNewIncome, overlay, async (income) => {
            try {
                const res = await this.income.createIncomes(income);

                this.getAllIncomes(); // Após criar, já aparecerá na lista do DOM

                // Limpando os campos após criar item
                divNewIncome.querySelectorAll('input').forEach(input => input.value = '');
                divNewIncome.querySelectorAll('select').forEach(select => select.value = 'select');

                clearFormErrors(divNewIncome);
                modelItemCreatedOrDelete(JSON.stringify(res.data.message).replace(/^"|"$/g, ''));

            } catch (err) {
                if (err instanceof AxiosError || axios.isAxiosError(err)) {
                    const error = err as AxiosError;
                    formErrors(error, divNewIncome, overlay);
                }
            }
        });
    }

    async getAllIncomes() {
        const data = await this.income.getAllIncomes(this.skip, this.perPage);

        if (!data || !data.incomes || data.incomes.length === 0) {
            // Limpa o cache se não houver dados
            this.currentData = null;
            notItem('Nenhuma receita criada.', this.divItems);
            return undefined;
        }

        // Atualiza cache com os dados recentes
        this.currentData = {
            ...data,
            // Metadata adicional para debugar
            fetchedAt: new Date().toISOString(),
            page: this.currentPage,
            skip: this.skip
        }

        // Atualiza o DOM e lista todos os incomes que tem no banco
        paginateItems(this.currentPage, data.pages, this.perPage)
        listItem(data.incomes, this.divItems);

        this.setupDeleteListener();

        return data;
    }

    // Método para atualização de receita

    async deleteIncomeById(index: number) {
        const id = this.currentData.incomes[index].id
        const res = await this.income.deleteIncomeById(id);

        modelItemCreatedOrDelete(JSON.stringify(res.data.message).replace(/^"|"$/g, ''))
        this.getAllIncomes();
    }
}