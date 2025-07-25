//src/repositories/ExpenseRepository.ts
import prisma from "@config/prisma"// Importando intância ja criada

import { Expense } from "@prisma/client"
import ExpenseDTO from "src/types/ExpenseDTO";

class ExpenseRepository {
    async criar(data: ExpenseDTO): Promise<Expense> {
        const expense = await prisma.expense.create({ data });
        return expense
    }

    async listar(): Promise<ExpenseDTO[]> {
        const expense = await prisma.expense.findMany({})
        return expense;
    }
}

export default ExpenseRepository;