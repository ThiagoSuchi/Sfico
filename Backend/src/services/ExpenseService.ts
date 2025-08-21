import { Request } from "express";

import ExpenseRepository from "../repositories/ExpenseRepository";
import { Expense } from "prisma/prisma-client/default";
import { formatedDateDMY } from "../utils/helpers/formatDate";
import { FilterDTO } from "../interfaces/ListIncomesExpenseSummaryDTO";

class ExpenseService {
    private repository: ExpenseRepository;

    constructor() {
        this.repository = new ExpenseRepository();
    }

    async criar(content: { 
        valor: string; 
        categoria: string; 
        descricao?: string | null; 
        data: Date 
    }): Promise<Expense> {
        console.log('POST/criar - ExpenseService.ts');
    
        const expense = await this.repository.criar({
            valor: content.valor,
            categoria: content.categoria,
            descricao: content.descricao,
            data: content.data
        });

        return expense;
    }

    async listar(req: Request): Promise<object | null> {
        console.log('GET/listar - ExpenseService.ts');

        // Recebendo paginação por parâmetros
        const skip = Number(req?.query?.skip) || 0;
        const per_page = Number(req?.query?.per_page) || 10;

        const { total, pages, expenses } = await this.repository.listar({ skip, per_page });

        if (expenses!.length === 0) {
            return null;
        }

        const expensesResult = expenses!.map((item) => {
            return {
                ...item,
                data: formatedDateDMY(item.data)
            };
        })

        return { 
            total, 
            pages, 
            skip,
            per_page, 
            expenses: expensesResult
        };
    }

    async listarPorId(expenseId: string): Promise<object | null> {
        console.log('GET/listarPorId - ExpenseService.ts');

        const expense = await this.repository.listarPorId(expenseId);

        if (!expense) return null 

        return {
            ...expense,
            data: formatedDateDMY(expense.data)
        };
    }

    async listarPorFiltro({ category, date, skip, per_page }: FilterDTO): Promise<object | null> {
        console.log('GET/expenses/filtro - ExpenseService.ts');
        
        let firstDayMonth: Date | undefined;
        let lastDayMonth: Date | undefined;

        if (date && typeof date === 'string') {
            const [mes, ano] = date.split('/');
            firstDayMonth = new Date(Date.UTC(+ano, +mes - 1, 1, 0, 0, 0)); // Primeiro dia do mês
            lastDayMonth = new Date(Date.UTC(+ano, +mes, 0, 23, 59, 59)); // Último dia do mês
        }

        const { total, pages, expenses } = await this.repository.listarPorFiltro({
            category,
            firstDate: firstDayMonth,
            lastDate: lastDayMonth,
            skip: skip || 0,
            per_page: per_page || 7
        });

        if (!expenses || expenses.length === 0) {
            return null
        }

        const expensesResult = expenses.map(item => ({
            ...item,
            data: formatedDateDMY(item.data)
        }));

        return {
            total,
            pages,
            skip: skip || 0,
            per_page: per_page || 7,
            expenses: expensesResult
        };
    }

    async atualizar(id: string, data: Expense): Promise<Expense> {
        console.log('PUT/atualizar - ExpenseService.ts');

        const expense = await this.repository.atualizar(id, data)
        return expense
    }

    async deletarPorID(id: string): Promise<void> {
        console.log('DELETE/deletarPorId - ExpenseService.ts');

        await this.repository.deletarPorID(id)
    }

    async deletar(): Promise<void> {
        console.log('DELETE/deletar - ExpenseService.ts');
        
        await this.repository.deletar();
    }
}

export default ExpenseService;