//src/controller/ExpenseController.ts
import { Request, Response } from "express";
import * as yup from "yup";

import ExpensiveService from "@services/ExpenseService";
import { ExpenseSchema } from "@utils/validations/ExpenseSchema";
import formatDate from "@utils/helpers/formatDate";

class ExpenseController {
    private service: ExpensiveService

    constructor() {
        this.service = new ExpensiveService();
    }

    async criar(req: Request, res: Response) {
        try {
            const { valor, categoria, descricao, data } = req.body;
            const dateFormated = formatDate(data)

            await ExpenseSchema.validate({
                valor, 
                categoria, 
                descricao, 
                dateFormated
            });
            
            const expense = await this.service.criar({
                valor,
                categoria,
                descricao,
                data: dateFormated
            });
    
            res.status(201).json({ 
                message: 'Expensives created successfully.', 
                data: expense
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
            const expenses = await this.service.listar();
            
            res.status(200).send(expenses)
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
}

export default ExpenseController;