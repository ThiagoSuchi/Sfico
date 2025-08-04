import { Request } from "express";

import IncomeRepository from "@repositories/IncomesRepository";
import { Incomes } from "@prisma/client";
import { formatedDateDMY } from "@utils/helpers/formatDate";
import { FilterDTO } from "@interfaces/ListIncomesExpenseSummaryDTO";

class IncomeService {
    private repository: IncomeRepository;

    constructor() {
        this.repository = new IncomeRepository();
    }

    async criar(content: { 
        valor: number; 
        categoria: string; 
        descricao?: string | null; 
        data: Date 
    }): Promise<Incomes> {
        console.log('POST/criar - IncomeService.ts');
    
        const income = await this.repository.criar({
            valor: content.valor,
            categoria: content.categoria,
            descricao: content.descricao,
            data: content.data
        });

        return income;
    }

    async listar(req: Request): Promise<object | null> {
        console.log('GET/listar - IncomeService.ts');

        // Recebendo paginação por parâmetros
        const skip = Number(req?.query?.skip) || 0;
        const per_page = Number(req?.query?.per_page) || 10;

        const { total, pages, incomes } = await this.repository.listar({ skip, per_page });

        if (incomes!.length === 0) {
            return null;
        }

        const incomesResult = incomes!.map((item) => {
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
            incomes: incomesResult
        };
    }

    async listarPorId(incomeId: string): Promise<object | null> {
        console.log('GET/listarPorId - IncomeService.ts');

        const income = await this.repository.listarPorId(incomeId);

        if (!income) return null 

        return {
            ...income,
            data: formatedDateDMY(income.data)
        };
    }

    async listarPorFiltro({ category, date }: FilterDTO): Promise<any[] | null> {
        console.log('GET/incomes/filtro - IncomeService.ts');
        
        let firstDayMonth: Date | undefined;
        let lastDayMonth: Date | undefined;

        if (date && typeof date === 'string') {
            const [mes, ano] = date.split('/');
            firstDayMonth = new Date(Date.UTC(+ano, +mes - 1, 1, 0, 0, 0)); // Primeiro dia do mês
            lastDayMonth = new Date(Date.UTC(+ano, +mes, 0, 23, 59, 59)); // Último dia do mês
        }

        const incomesFilter = await this.repository.listarPorFiltro({
            category,
            firstDate: firstDayMonth,
            lastDate: lastDayMonth
        });

        if (incomesFilter.length === 0) {
            return null
        }

        return incomesFilter.map(item => ({
            ...item,
            data: formatedDateDMY(item.data)
        }))
    }

    async atualizar(id: string, data: Incomes): Promise<Incomes> {
        console.log('PUT/atualizar - IncomeService.ts');

        const income = await this.repository.atualizar(id, data)
        return income
    }

    async deletarPorID(id: string): Promise<void> {
        console.log('DELETE/deletarPorId - incomeService.ts');

        await this.repository.deletarPorID(id)
    }

    async deletar(): Promise<void> {
        console.log('DELETE/deletar - incomeService.ts');
        
        await this.repository.deletar();
    }
}

export default IncomeService;