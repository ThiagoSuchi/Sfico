//src/repositories/IncomeRepository.ts
import prisma from "../config/prisma"// Importando intância ja criada

import { Incomes } from "prisma/prisma-client/default";
import { ListDTO, PaginateDTO } from "../interfaces/ListIncomesExpenseSummaryDTO";
import AppError from "../utils/errors/AppErrors";

class IncomeRepository {

    async criar(data: { 
        valor: string; 
        categoria: string; 
        descricao?: string | null; 
        data: Date 
    }): Promise<Incomes> {
        const income = await prisma.incomes.create({ data });
        return income;
    }

    async listar({skip, per_page}: PaginateDTO): Promise<ListDTO> {
        const [incomes, total] = await prisma.$transaction([
            prisma.incomes.findMany({ skip, take: per_page }), // Busca uma lista de receitas paginada.
            prisma.incomes.count() // Conta o número total de receitas no banco.
        ])

        // Irá calcular o número total de items, divididos em páginas de tamanho fixo.
        const pages = Math.ceil(total / per_page);

        return { total, pages, incomes };
    }


    async listarPorId(id: string): Promise<Incomes | null> {
        const income = await prisma.incomes.findUnique({ where: { id } })
        return income;
    }


    async listarPorFiltro(filter: {
        category?: string,
        firstDate?: Date,
        lastDate?: Date,
        skip?: number,
        per_page?: number
    }): Promise<ListDTO> {
        
        const whereClause: any = {};

        if (filter.category && filter.category !== 'todas') {
            whereClause.categoria = filter.category;
        }

        if (filter.firstDate || filter.lastDate) {
            whereClause.data = {};
            if (filter.firstDate) whereClause.data.gte = filter.firstDate;
            if (filter.lastDate) whereClause.data.lte = filter.lastDate
        }

        const [incomes, total] = await prisma.$transaction([
            prisma.incomes.findMany({
                where: whereClause,
                orderBy: { data: 'desc' },
                skip: filter.skip || 0,
                take: filter.per_page || 7
            }),
            prisma.incomes.count({
                where: whereClause
            })
        ]);

        const pages = Math.ceil(total / (filter.per_page || 7));
        
        return { total, pages, incomes };
    }
    

    async atualizar(id: string, data: object): Promise<Incomes> {
        try {
            const income = await prisma.incomes.update({
                where: { id },
                data
            })
            return income;
        } catch (err: any) {
            if (err.code === 'P2025') {
                throw new AppError("Erro ao atualizar receita, ID não encontrado", 404);
            }
            throw err;
        }
    }


    async deletarPorID(id: string): Promise<void> {
        try {
            await prisma.incomes.delete({ where: { id } })
        } catch (err: any) {
            if (err.code === 'P2025') {
                throw new AppError("Receita não encontrada, por favor insira um ID válido.", 404);
            }
            throw err;
        }
    }


    async deletar(): Promise<void> {
        const incomes = await prisma.incomes.deleteMany({})
        if (!incomes.count) {
            throw new AppError("Erro ao apagar receitas, não foi encontrada nenhuma receita.", 404)
        }
    }
}

export default IncomeRepository;