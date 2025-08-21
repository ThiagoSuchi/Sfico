//src/repositories/ExpenseRepository.ts
import prisma from "../config/prisma"// Importando intância ja criada

import { Expense } from "prisma/prisma-client/default"
import { ListDTO, PaginateDTO } from "../interfaces/ListIncomesExpenseSummaryDTO";
import AppError from "../utils/errors/AppErrors";

class ExpenseRepository {
    async criar(data: { 
        valor: string; 
        categoria: string; 
        descricao?: string | null; 
        data: Date 
    }): Promise<Expense> {
        const expense = await prisma.expense.create({ data });
        return expense
    }

    async listar({skip, per_page}: PaginateDTO): Promise<ListDTO> {
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
        lastDate?: Date,
        skip?: number,
        per_page?: number
    }): Promise<ListDTO> {
        const [expenses, total] = await prisma.$transaction([
            prisma.expense.findMany({
                where: {
                    categoria: filter.category,
                    data: {
                        gte: filter.firstDate, // greater than or equal → maior ou igual.
                        lte: filter.lastDate //  less than or equal → menor ou igual.
                    }
                },
                skip: filter.skip || 0,
                take: filter.per_page || 7,
                orderBy: { data: 'desc' } // Ordenar por ordem decrescente.
            }),
            prisma.expense.count({
                where: {
                    categoria: filter.category,
                    data: {
                        gte: filter.firstDate,
                        lte: filter.lastDate
                    }
                }
            })
        ]);

        // Irá calcular o número total de páginas, divididos em páginas de tamanho fixo.
        const pages = Math.ceil(total / (filter.per_page || 7));

        return { total, pages, expenses };
    }
    
    async atualizar(id: string, data: object): Promise<Expense> {
        try {
            const expense = await prisma.expense.update({
                where: { id },
                data
            })
            
            return expense

        } catch (err: any) {
            if (err.code === 'P2025') {
                throw new AppError("Erro ao atualizar despesa, ID não encontrado", 404);
            }
            throw err
        }
    }

    async deletarPorID(id: string): Promise<void> {
        try {
            await prisma.expense.delete({ where: { id } })
        } catch (err: any) {
            if (err.code === 'P2025') {
                throw new AppError("Despesa não encontrada, por favor insira um ID válido.", 404);
            }
            throw err
        }
    }

    async deletar(): Promise<void> {
        const expense = await prisma.expense.deleteMany({})

        if (!expense.count) {
            throw new AppError("Erro ao apagar despesas, não foi encontrado nenhuma despesa.", 404)
        }
    }
}

export default ExpenseRepository;