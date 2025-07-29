import { Request } from "express";

import { Expense } from "@prisma/client";
import ExpenseRepository from "@repositories/ExpenseRepository";
import { formatDateISO, formatedDateDMY } from "@utils/helpers/formatDate";
import { ExpenseSchema } from "@utils/validations/ExpenseSchema";

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

    async listar(req: Request): Promise<object | null> {
        console.log('GET/listar - ExpenseService.ts');

        // Recebendo paginação por parâmetros
        const skip = Number(req?.query?.skip) || 0;
        const per_page = Number(req?.query?.per_page) || 10;

        const { total, pages, expenses } = await this.repository.listar({ skip, per_page });

        if (expenses.length === 0) {
            return null;
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

    async listarPorId(expenseId: string): Promise<object | null> {
        console.log('GET/listarPorId - ExpenseService.ts');

        const expense = await this.repository.listarPorId(expenseId);

        if (!expense) return null 

        return {
            ...expense,
            data: formatedDateDMY(expense.data)
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