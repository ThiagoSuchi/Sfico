//src/services/SummaryService.ts

import SummaryRepository from "@repositories/SummaryRepository";


class SummaryService {
    private repository: SummaryRepository;

    constructor() {
        this.repository = new SummaryRepository();
    }

    async allEntries() {
        console.log('GET/summary/all - SummaryService.ts');

        const finance = await this.repository.getAllIncomesAndExpenses();

        const saldo = finance.totalIncomes - finance.totalExpense

        return {
            valorTotalReceitas: finance.totalIncomes,
            valorTotalDespesas: finance.totalExpense,
            saldo
        }
    }

    async summaryByMonthAndYear(mes: number, ano: number): Promise<object | null> {
        console.log('GET/summary - SummaryService.ts');

        const firstDayMonth = new Date(Date.UTC(ano, mes - 1, 1, 0, 0, 0))
        const lastDayMonth = new Date(Date.UTC(ano, mes, 0, 23, 59, 59))

        const totalExpense = await this.repository.totalExpenses(firstDayMonth, lastDayMonth); // retorna a soma do valores das despesas.

        if (!totalExpense) {
            return null
        }

        return {
            ano,
            mes,
            totalDespesas: totalExpense,
        };
    }
}

export default SummaryService