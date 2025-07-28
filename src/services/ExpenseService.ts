import { Request } from "express";

import { Expense } from "@prisma/client";
import ExpenseRepository from "@repositories/ExpenseRepository";
import { formatDateISO, formatedDateDMY } from "@utils/helpers/formatDate";

class ExpenseService {
    private repository: ExpenseRepository;

    constructor() {
        this.repository = new ExpenseRepository();
    }

    async criar({
        id,
        valor,
        categoria,
        descricao,
        data,
        createdAt,
        updatedAt
    }: Expense): Promise<Expense> {
        console.log('POST/criar - ExpenseService.ts');
    
        const expense = await this.repository.criar({
            id,
            valor,
            categoria,
            descricao,
            data,
            createdAt,
            updatedAt
        });

        return expense;
    }

    async listar(req: Request): Promise<object> {
        console.log('GET/listar - ExpenseService.ts');

        // Recebendo paginação por parâmetros
        const skip = Number(req?.query?.skip) || 0;
        const per_page = Number(req?.query?.per_page) || 10;

        const { total, pages, expenses } = await this.repository.listar({ skip, per_page });

        if (expenses.length === 0) {
            throw new Error("Nenhuma despesa foi encontrada.");
        }

        const expensesResult = expenses.map((item) => {
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

    async listarPorId(expenseId: string): Promise<object> {
        console.log('GET/listarPorId - ExpenseService.ts');

        if (!expenseId) {
            throw new Error('Dispesa não encontrada ou ID incorreto.');
        }

        const expense = await this.repository.listarPorId(expenseId);
        return {
            ...expense,
            data: formatedDateDMY(expense.data)
        };
    }
}

export default ExpenseService;