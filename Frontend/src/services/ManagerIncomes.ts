//src/services/ManagerIncomes.ts

import axios, { AxiosError } from "axios";
import Incomes from "../api/Incomes";
import { clearFormErrors, formErrors } from "../utils/Errors/formErrorsDOM";
import { listItem, createItem, deleteItem, updateItem, listFilterItem } from "../utils/render/managerItemsFunc";
import { modelCreatedOrUpdatedOrDeleted } from "../utils/render/modelItemCreate";
import { notItem } from "../utils/render/notItemDOM";
import { paginateItems } from "../utils/render/paginationDOM";
import { FilterManagerGeneric } from "../utils/filters/FilterManagerGeneric";
import type { IncomeExpense } from "../model/IncomeExpenseModel";

export class ManagerIncomes {
    private divItems = document.querySelector('.item-income')! as HTMLDivElement;
    private divNewIncome = document.querySelector('.new-income') as HTMLDivElement;
    private overlay = document.getElementById('new-item-overlay') as HTMLDivElement;
    private income = Incomes;

    // Cache de dados atuais
    private currentData: any = null;

    // Filter Manager
    private filterManager: FilterManagerGeneric;

    private currentPage = 1;
    private skip = 0;
    private perPage = 7;

    constructor() {
        // Inicializando o FilterManager
        this.filterManager = new FilterManagerGeneric(
            this.divItems,
            (data: any) => this.currentData = data,
            () => this.setupDeleteListener(),
            () => this.setupUpdateListener(),
            () => this.getAllIncomes(),
            this.income,
            'incomes'
        );

        this.setupPaginationListener();
        this.createIncome();
        this.getAllIncomes();
        this.filterIncome();
    }

    private setupPaginationListener() {
        window.addEventListener('pageChanged', (e: Event) => {
            const { page, skip, context } = (e as CustomEvent).detail;

            if (context !== 'income') return;

            this.currentPage = page;
            this.skip = skip;

            // Verifica se há filtro ativo, se estiver mostra somente os items filtrados,
            // idependente da paginação.
            if (this.filterManager.isFiltering && this.filterManager.currentFilter) {
                this.filterManager.applyFilter(
                    this.filterManager.currentFilter,
                    this.currentPage,
                    this.skip,
                    this.perPage
                );
            } else {
                this.getAllIncomes();
            }
        })
    }

    private setupUpdateListener() {
        if (!this.currentData) return;

        updateItem(
            this.currentData.incomes,
            this.divItems,
            this.divNewIncome,
            this.overlay,
            async (index, data) => {
                await this.updateIncomeById(index, data);
            }
        )
    }

    private setupDeleteListener() {
        if (!this.currentData) return;

        deleteItem(this.divItems, async (index) => {
            await this.deleteIncomeById(index);
        })
    }

    async createIncome() {
        const btnNewIncome = document.getElementById('btn-newReceita') as HTMLButtonElement;
        const btnCreate = document.querySelector('.create-income') as HTMLButtonElement;

        createItem(btnCreate, btnNewIncome, this.divNewIncome, this.overlay, async (income) => {
            try {
                const res = await this.income.createIncomes(income);

                this.getAllIncomes(); // Após criar, já aparecerá na lista do DOM

                // Limpando os campos após criar item
                this.divNewIncome.querySelectorAll('input').forEach(input => input.value = '');
                this.divNewIncome.querySelectorAll('select').forEach(select => select.value = 'select');

                clearFormErrors(this.divNewIncome);
                modelCreatedOrUpdatedOrDeleted(JSON.stringify(res.data.message).replace(/^"|"$/g, ''));

                window.dispatchEvent(new CustomEvent('dataChanged', {
                    detail: { context: 'income' }
                }));

            } catch (err) {
                if (err instanceof AxiosError || axios.isAxiosError(err)) {
                    const error = err as AxiosError;
                    formErrors(error, this.divNewIncome, this.overlay);
                }
            }
        });
    }

    async getAllIncomes() {
        const data = await this.income.getAllIncomes(this.skip, this.perPage);

        if (!data || !data.incomes) {
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

        const pages = data.pages || 1;

        // Atualiza o DOM e lista todos os incomes que tem no banco
        paginateItems(this.currentPage, pages, this.perPage, 'income')
        listItem(data.incomes, this.divItems);

        this.setupDeleteListener();
        this.setupUpdateListener();

        return data.incomes
    }

    async filterIncome() {
        listFilterItem(async (category, date) => {
            try {
                // Configurar estado do filtro
                this.filterManager.setFilterState(category, date);

                // Reset para página 1 quando aplicar novo filtro
                this.currentPage = 1;
                this.skip = 0;

                await this.filterManager.applyFilter(
                    { category, date },
                    this.currentPage,
                    this.skip,
                    this.perPage
                );

            } catch (err) {
                notItem('Nenhuma receita encontrada.', this.divItems);
            }
        })
    }

    async updateIncomeById(index: number, data: IncomeExpense) {
        try {
            const id = this.currentData.incomes[index].id
            const dataUpdated = { id, ...data }

            const res = await this.income.updateIncomeById(dataUpdated);

            modelCreatedOrUpdatedOrDeleted(JSON.stringify(res.data.message).replace(/^"|"$/g, ''));

            window.dispatchEvent(new CustomEvent('dataChanged', {
                detail: { context: 'income' }
            }));

            this.getAllIncomes();
        } catch (err) {
            if (err instanceof AxiosError || axios.isAxiosError(err)) {
                const error = err as AxiosError;
                formErrors(error, this.divNewIncome, this.overlay)
            }
        }
    }

    async deleteIncomeById(index: number) {
        const id = this.currentData.incomes[index].id
        const res = await this.income.deleteIncomeById(id);

        modelCreatedOrUpdatedOrDeleted(JSON.stringify(res.data.message).replace(/^"|"$/g, ''));

        window.dispatchEvent(new CustomEvent('dataChanged', {
            detail: { context: 'income' }
        }));

        this.getAllIncomes();
    }
}