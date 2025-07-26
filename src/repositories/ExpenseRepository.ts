//src/repositories/ExpenseRepository.ts
import prisma from "@config/prisma"// Importando intância ja criada

import { Expense } from "@prisma/client"
import paginateDTO from "@interfaces/PaginateDTO";
import ListExpensesDTO from "@interfaces/ExpenseDTO";

class ExpenseRepository {
    async criar(data: Expense): Promise<Expense> {
        const expense = await prisma.expense.create({ data });
        return expense
    }

    async listar({skip, per_page}: paginateDTO): Promise<ListExpensesDTO> {
        const [expense, total] = await prisma.$transaction([
            prisma.expense.findMany({ skip, take: per_page }), // Busca uma lista de despesas paginada
            prisma.expense.count() // Conta o número total de despesas no banco
        ])

        // Irá calcular o número total de páginas, divididos em páginas de tamanho fixo.
        const pages = Math.ceil(total / per_page)

        return { total, pages, expense };
    }
}

export default ExpenseRepository;