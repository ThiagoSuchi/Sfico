//src/repositories/ExpensiveRepository.ts
import prisma from "@config/prisma"// Importando intância ja criada

import { Expense } from "@prisma/client"
import ExpensiveDTO from "src/types/ExpensiveDTO";

class ExpensiveRepository {
    async criar(data: ExpensiveDTO): Promise<Expense> {
        const expensive = await prisma.expense.create({ data });
        return expensive
    }
}

export default ExpensiveRepository;