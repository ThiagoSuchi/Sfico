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
            const dataJSON = req.body;
            const dateFormated = formatDate(dataJSON.data)

            await ExpenseSchema.validate({
               ...dataJSON,
                dateFormated
            });
            
            const expense = await this.service.criar({
                ...dataJSON,
                data: dateFormated
            });
    
            res.status(201).json({ 
                message: 'Expensives created successfully.', 
                content: expense
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
}

export default ExpenseController;