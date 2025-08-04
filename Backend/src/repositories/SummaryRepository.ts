//src/repositories/SummaryRepository.ts

import prisma from "@config/prisma";

class SummaryRepository {

    async getAllIncomesAndExpenses() {
        const incomes = await prisma.incomes.aggregate({ _sum: { valor: true } })
        const expenses = await prisma.expense.aggregate({ _sum: { valor: true } })

        return {
            totalIncomes: incomes._sum.valor ?? 0,
            totalExpense: expenses._sum.valor ?? 0
        }
    }

    async totalExpenses(firstDate: Date, lastDate: Date) {
        const result = await prisma.expense.aggregate({
            _sum: { valor: true },
            where: {
                data: {
                    gte: firstDate,
                    lte: lastDate
                }
            }
        });

        return result._sum.valor ?? 0;
    }
}

export default SummaryRepository;