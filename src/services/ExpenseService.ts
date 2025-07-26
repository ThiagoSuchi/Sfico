import { Expense } from "@prisma/client";
import ExpenseRepository from "@repositories/ExpenseRepository";
import { Request } from "express";

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

    async listar(req: Request): Promise<Object> {
        console.log('GET/listar - ExpenseService.ts');

        // Recebendo paginação por parâmetros
        const skip = Number(req?.query?.skip) || 0;
        const per_page = Number(req?.query?.per_page) || 10;

        const { total, pages, expense } = await this.repository.listar({ skip, per_page });

        if (expense.length === 0) {
            throw new Error("Nenhuma despesa foi encontrada.");
        }

        const expenses = expense.map((item) => {
            // Transformando o Date em string
            const dateString = item.data.toISOString();

            // Capturando o ano, mês e dia do campo data
            // separando o dateString em um array de strings com 2 itens 
            // os que estão antes do T e os que estão depois do T
            const [ano, mes, dia] = dateString.split('T')[0].split('-');

            return {
                ...item,
                data: `${dia}/${mes}/${ano}`
            };
        })

        return { 
            total, 
            pages, 
            skip,
            per_page, 
            expenses
        };
    }
}

export default ExpenseService;