//src/controller/ExpenseController.ts
import { Request, Response } from "express";
import * as yup from "yup";

import ExpensiveService from "@services/ExpenseService";
import { BodySchema, BodySchemaID } from "@utils/validations/BodySchema";
import { formatDateISO, formatedDateDMY } from "@utils/helpers/formatDate";
import AppError from "@utils/errors/AppErrors";

class ExpenseController {
    private service: ExpensiveService

    constructor() {
        this.service = new ExpensiveService();
    }

    async criar(req: Request, res: Response) {
        const dataJSON = req.body;
        const dateFormated = formatDateISO(dataJSON.data)

        const validated = await BodySchema.validate({ ...dataJSON, dateFormated }, { 
            abortEarly: false // Captura todos os erros, não apenas o primeiro
        });

        const expense = await this.service.criar({
            ...validated,
            data: validated.dateFormated
        });

        res.status(201).json({
            message: 'Dispesa criada com sucesso.',
            ...expense,
            data: formatedDateDMY(dateFormated)
        })
    }

    async listar(req: Request, res: Response) {
        const expenses = await this.service.listar(req);

        if (!expenses) {
            throw new AppError("Nenhuma despesa foi criada.", 404)
        }

        res.status(200).send(expenses)
    }

    async listarPorId(req: Request, res: Response) {
        const { id } = req.params || {};

        await BodySchemaID.validate({ id })

        const expense = await this.service.listarPorId(id);

        if (!expense) {
            throw new AppError("Despesa não encontrada.", 404)
        }

        res.status(200).json(expense);
    }

    async listarPorFiltro(req: Request, res: Response) {
        const { category, date, skip, per_page } = req.query;
        
        // Criando um objeto filter com campos válidos
        const filter: any = {};
        if (category && category !== 'undefined' && category !== 'todas') filter.category = String(category);
        if (date && date !== 'undefined') filter.date = String(date);
        filter.skip = skip ? Number(skip) : 0;
        filter.per_page = per_page ? Number(per_page) : 7

        const expenses = await this.service.listarPorFiltro(filter);

        if (!expenses) {
            throw new AppError("Nenhuma despesa encontrada com os filtros aplicados.", 404)
        }

        res.status(200).json(expenses);
    }

    async atualizar(req: Request, res: Response) {
        const dataJSON = req.body;
        const id = req.params.id;

        const dateFormated = formatDateISO(dataJSON.data);

        await BodySchema.validate({ ...dataJSON, dateFormated }, { 
            abortEarly: false
        });

        const expense = await this.service.atualizar(id, { ...dataJSON, data: dateFormated });
        
        res.status(200).json({ 
            message: 'Despesa atualizada com sucesso.', 
            ...expense,
            data: formatedDateDMY(dateFormated)
        });
    }

    async deletarPorID(req: Request, res: Response) {
        const expenseId = req.params.id;

        await this.service.deletarPorID(expenseId);
        res.status(200).json({ message: 'Despesa deletada com sucesso' });
    }

    async deletar(req: Request, res: Response) {
        await this.service.deletar();
        res.status(200).json({ message: 'Despesas apagadas com sucesso.' })
    }
}

export default ExpenseController;