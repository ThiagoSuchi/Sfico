//src/controller/IncomeController.ts
import { Request, Response } from "express";

import IncomeService from "@services/IncomeService";
import { BodySchema, BodySchemaID } from "@utils/validations/BodySchema";
import { formatDateISO, formatedDateDMY } from "@utils/helpers/formatDate";
import AppError from "@utils/errors/AppErrors";

class IncomeController {
    private service: IncomeService

    constructor() {
        this.service = new IncomeService();
    }

    async criar(req: Request, res: Response) {
        const dataJSON = req.body;
        const dateFormated = formatDateISO(dataJSON.data)

        const validated = await BodySchema.validate({ ...dataJSON, dateFormated }, { 
            abortEarly: false // Captura todos os erros, não apenas o primeiro
        });

        const income = await this.service.criar({
            ...validated,
            data: validated.dateFormated
        });

        res.status(201).json({
            message: 'Receita criada com sucesso.',
            ...income,
            data: formatedDateDMY(dateFormated)
        })
    }

    async listar(req: Request, res: Response) {
        const incomes = await this.service.listar(req);

        if (!incomes) {
            throw new AppError("Nenhuma receita foi criada.", 404)
        }

        res.status(200).send(incomes)
    }

    async listarPorId(req: Request, res: Response) {
        const { id } = req.params || {};

        await BodySchemaID.validate({ id })

        const income = await this.service.listarPorId(id);

        if (!income) {
            throw new AppError("Receita não encontrada.", 404)
        }

        res.status(200).json(income);
    }

    async listarPorFiltro(req: Request, res: Response) {
        const { categoria, data } = req.query;

        // Criando um objeto filter com campos válidos
        const filter: any = {};
        if (categoria && categoria !== 'undefined') filter.category = String(categoria);
        if (data && data !== 'undefined') filter.date = String(data);

        const incomes = await this.service.listarPorFiltro(filter);

        if (!incomes || incomes.length === 0) {
            throw new AppError("Receitas não encontradas.", 404)
        }

        res.status(200).json({ message: 'Receitas encontradas: ', incomes });
    }

    async atualizar(req: Request, res: Response) {
        const dataJSON = req.body;
        const id = req.params.id;

        const dateFormated = formatDateISO(dataJSON.data);

        await BodySchema.validate({ ...dataJSON, dateFormated });

        const income = await this.service.atualizar(id, { ...dataJSON, data: dateFormated });
        
        res.status(200).json({ 
            message: 'Receita atualizada com sucesso.', 
            ...income,
            data: formatedDateDMY(dateFormated)
        });
    }

    async deletarPorID(req: Request, res: Response) {
        const incomeId = req.params.id;

        await this.service.deletarPorID(incomeId);
        res.status(200).json({ message: 'Receita deletada com sucesso' });
    }

    async deletar(req: Request, res: Response) {
        await this.service.deletar();
        res.status(200).json({ message: 'Receitas apagadas com sucesso.' })
    }
}

export default IncomeController;