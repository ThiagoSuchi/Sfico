//src/services/ManagerExpenses.ts

import axios, { AxiosError } from "axios";
import Expenses from "../api/Expense";
import { clearFormErrors, formErrors } from "../utils/Errors/formErrorsDOM";
import { listItem, createItem, deleteItem, updateItem, listFilterItem } from "../utils/render/managerItemsFunc";
import { modelCreatedOrUpdatedOrDeleted } from "../utils/render/modelItemCreate";
import { notItem } from "../utils/render/notItemDOM";
import { paginateItems } from "../utils/render/paginationDOM";
import { FilterManagerGeneric } from "../utils/filters/FilterManagerGeneric";
import type { IncomeExpense } from "../model/IncomeExpenseModel";

export class ManagerExpenses {
    private divItems = document.querySelector('.item-expense')! as HTMLDivElement;
    private divNewExpense = document.querySelector('.new-expense') as HTMLDivElement;
    private overlay = document.getElementById('new-item-overlay') as HTMLDivElement;
    private expense = Expenses;

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
            () => this.getAllExpenses(),
            this.expense,
            'expenses'
        );

        this.setupPaginationListener();
        this.createExpense();
        this.getAllExpenses();
        this.filterExpense();
    }

    private setupPaginationListener() {
        window.addEventListener('pageChanged', (e: Event) => {
            const { page, skip, context } = (e as CustomEvent).detail;

            if (context !== 'expense') return;

            this.currentPage = page;
            this.skip = skip;

            // Verifica se há filtro ativo, se estiver mostra somente os items filtrados,
            // independente da paginação.
            if (this.filterManager.isFiltering && this.filterManager.currentFilter) {
                this.filterManager.applyFilter(
                    this.filterManager.currentFilter,
                    this.currentPage,
                    this.skip,
                    this.perPage
                );
            } else {
                this.getAllExpenses();
            }
        })
    }

    private setupUpdateListener() {
        if (!this.currentData) return;

        updateItem(
            this.currentData.expenses,
            this.divItems,
            this.divNewExpense,
            this.overlay,
            async (index, data) => {
                await this.updateExpenseById(index, data);
            }
        )
    }

    private setupDeleteListener() {
        if (!this.currentData) return;

        deleteItem(this.divItems, async (index) => {
            await this.deleteExpenseById(index);
        })
    }

    async createExpense() {
        const btnNewExpense = document.getElementById('btn-newDespesa') as HTMLButtonElement;
        const btnCreate = document.querySelector('.create-expense') as HTMLButtonElement;

        createItem(btnCreate, btnNewExpense, this.divNewExpense, this.overlay, async (expense) => {
            try {
                const res = await this.expense.createExpense(expense);

                this.getAllExpenses(); // Após criar, já aparecerá na lista do DOM

                // Limpando os campos após criar item
                this.divNewExpense.querySelectorAll('input').forEach(input => input.value = '');
                this.divNewExpense.querySelectorAll('select').forEach(select => select.value = 'select');

                clearFormErrors(this.divNewExpense);
                modelCreatedOrUpdatedOrDeleted(JSON.stringify(res.data.message).replace(/^"|"$/g, ''));

            } catch (err) {
                if (err instanceof AxiosError || axios.isAxiosError(err)) {
                    const error = err as AxiosError;
                    formErrors(error, this.divNewExpense, this.overlay);
                }
            }
        });
    }

    async getAllExpenses() {
        const data = await this.expense.getAllExpenses(this.skip, this.perPage);

        if (!data || !data.expenses) {
            // Limpa o cache se não houver dados
            this.currentData = null;
            notItem('Nenhuma despesa criada.', this.divItems);
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

        // Atualiza o DOM e lista todas as expenses que tem no banco
        paginateItems(this.currentPage, pages, this.perPage, 'expense')
        listItem(data.expenses, this.divItems);

        this.setupDeleteListener();
        this.setupUpdateListener();
    }

    async filterExpense() {
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
                notItem('Nenhuma despesa encontrada.', this.divItems);
            }
        }, 'expense'); // Especifica que é para expense
    }

    // Método público para limpar filtro
    public clearFilter() {
        this.currentPage = 1;
        this.skip = 0;
        this.filterManager.clearFilter();
    }

    async updateExpenseById(index: number, data: IncomeExpense) {
        try {
            const id = this.currentData.expenses[index].id
            const dataUpdated = { id, ...data }

            const res = await this.expense.updateExpenseById(dataUpdated);

            modelCreatedOrUpdatedOrDeleted(JSON.stringify(res.data.message).replace(/^"|"$/g, ''));
            this.getAllExpenses();
        } catch (err) {
            if (err instanceof AxiosError || axios.isAxiosError(err)) {
                const error = err as AxiosError;
                formErrors(error, this.divNewExpense, this.overlay)
            }
        }
    }

    async deleteExpenseById(index: number) {
        const id = this.currentData.expenses[index].id
        const res = await this.expense.deleteExpenseById(id);

        modelCreatedOrUpdatedOrDeleted(JSON.stringify(res.data.message).replace(/^"|"$/g, ''))
        this.getAllExpenses();
    }
}