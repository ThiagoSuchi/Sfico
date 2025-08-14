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

    private currentPage = 1;
    private skip = 0;
    private perPage = 7;

    constructor() {
        this.setupPaginationListener();// Escuta eventos de mudança da página
        this.createIncome();
        this.getAllIncomes();
        this.deleteIncomeById();
    }

    private setupPaginationListener() {
        window.addEventListener('pageChanged', (e: Event) => {
            const { page, skip } = (e as CustomEvent).detail;

            this.currentPage = page;
            this.skip = skip;

            // Recarrega os dados da nova página
            this.getAllIncomes();
            this.deleteIncomeById();
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
                const inputs = divNewIncome.querySelectorAll('input');
                inputs.forEach(input => input.value = '');
                
                const selects = divNewIncome.querySelectorAll('select');
                selects.forEach(select => select.value = 'select');
                
                clearFormErrors(divNewIncome);
                modelItemCreatedOrDelete(JSON.stringify(res.data.message).replace(/^"|"$/g, ''));
                this.deleteIncomeById()

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
            notItem('Nenhuma receita criada.', this.divItems);
            return undefined;
        }
        
        paginateItems(this.currentPage, data.pages, this.perPage)
        
        // Lista todos os incomes que tem no banco
        listItem(data.incomes, this.divItems);

        return data;
    }

    // Método para atualização de receita

    //!!!!!! Problemas a corrigir !!!!!!!!
    // ao deletar uma receita e tentar deletar outra 
    // logo em seguida o botão de excluir perde evento.

    async deleteIncomeById() {
        const incomes = await this.income.getAllIncomes()
        
        deleteItem(this.divItems, async (index) => {
            const id = incomes?.incomes[index].id
            const res = await this.income.deleteIncomeById(id);
            
            modelItemCreatedOrDelete(JSON.stringify(res.data.message).replace(/^"|"$/g, ''))
            this.getAllIncomes();
        });
        
    }
}