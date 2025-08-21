//src/repositories/SummaryRepository.ts

import prisma from "config/prisma";
import { parseValue } from "../utils/helpers/formatValue";

class SummaryRepository {

    async getAllIncomesAndExpenses() {
        const incomesData = await prisma.incomes.findMany({ select: { valor: true } });
        const expensesData = await prisma.expense.findMany({ select: { valor: true } });

        const totalIncomes = incomesData.reduce((acc, i) => acc + parseValue(i.valor), 0);
        const totalExpense = expensesData.reduce((acc, e) => acc + parseValue(e.valor), 0);

        return {
            totalIncomes,
            totalExpense
        }
    }

    async totalIncomesAndExpenses(firstDate: Date, lastDate: Date) {
        const incomes = await prisma.incomes.findMany({
            where: {
                data: {
                    gte: firstDate,
                    lte: lastDate
                }
            },
            select: { valor: true }
        });

        const expenses = await prisma.expense.findMany({
            where: {
                data: {
                    gte: firstDate,
                    lte: lastDate
                }
            },
            select: { valor: true }
        });

        const totalIncome = incomes.reduce((acc, e) => acc + parseValue(e.valor), 0);
        const totalExpense = expenses.reduce((acc, e) => acc + parseValue(e.valor), 0);

        return {
            totalIncome,
            totalExpense
        }
    }
}

export default SummaryRepository;