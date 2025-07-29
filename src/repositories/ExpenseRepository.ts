//src/repositories/ExpenseRepository.ts
import prisma from "@config/prisma"// Importando intância ja criada

import { Expense } from "@prisma/client"
import { ListExpensesDTO, PaginateDTO } from "@interfaces/ExpenseDTO";

class ExpenseRepository {
    async criar(data: Expense): Promise<Expense> {
        const expense = await prisma.expense.create({ data });
        return expense
    }

    async listar({skip, per_page}: PaginateDTO): Promise<ListExpensesDTO> {
        const [expenses, total] = await prisma.$transaction([
            prisma.expense.findMany({ skip, take: per_page }), // Busca uma lista de despesas paginada.
            prisma.expense.count() // Conta o número total de despesas no banco.
        ])

        // Irá calcular o número total de páginas, divididos em páginas de tamanho fixo.
        const pages = Math.ceil(total / per_page)

        return { total, pages, expenses };
    }

    async listarPorId(id: string): Promise<Expense> {
        const expense = await prisma.expense.findUnique({ where: { id } })
        return expense!
    }

    async listarPorFiltro(filter: {
        category?: string,
        firstDate?: Date,
        lastDate?: Date
    }): Promise<Expense[]> {
        const expenses = await prisma.expense.findMany({
            where: {
                categoria: filter.category,
                data: {
                    gte: filter.firstDate, // greater than or equal → maior ou igual.
                    lte: filter.lastDate //  less than or equal → menor ou igual.
                }
            },
            orderBy: { data: 'desc' } // Ordenar por ordem decrescente.
        });

        return expenses
    }
    
    async atualizar(id: string, data: object): Promise<Expense> {
        const expense = await prisma.expense.update({
            where: { id },
            data
        })

        return expense
    }

    async deletarPorID(id: string): Promise<void> {
        await prisma.expense.delete({ where: { id } })
    }

    async deletar(): Promise<void> {
        await prisma.expense.deleteMany({})
    }
}

export default ExpenseRepository;