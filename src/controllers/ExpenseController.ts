//src/controller/ExpenseController.ts
import { Request, Response } from "express";
import * as yup from "yup";

import ExpensiveService from "@services/ExpenseService";
import { ExpenseSchema } from "@utils/validations/ExpenseSchema";
import { formatDateISO } from "@utils/helpers/formatDate";

class ExpenseController {
    private service: ExpensiveService

    constructor() {
        this.service = new ExpensiveService();
    }

    async criar(req: Request, res: Response) {
        try {
            const dataJSON = req.body;
            const dateFormated = formatDateISO(dataJSON.data)

            await ExpenseSchema.validate({ ...dataJSON, dateFormated });
            
            const expense = await this.service.criar({
                ...dataJSON,
                data: dateFormated
            });
    
            res.status(201).json({ 
                message: 'Dispesa criada com sucesso.', 
                expense
            })

        } catch (err) {
            console.log(err);
            res.status(400).send({
                message: err instanceof yup.ValidationError 
                ? 'Erro de validação nos campos'
                : 'Erro ao criar despesa',
                error: err
            })
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const expenses = await this.service.listar(req);
            
            res.status(200).send(expenses)
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }

    async listarPorId(req: Request, res: Response) {
        try {
            const expenseId = req.params.id;
            
            const expense = await this.service.listarPorId(expenseId);

            res.status(200).json(expense);
        } catch (err) {
            console.log(err);
            res.status(404).json(err);
        }

    }
}

export default ExpenseController;