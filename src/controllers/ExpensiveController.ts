import { Request, Response } from "express";
import * as yup from "yup";

import ExpensiveService from "@services/ExpensiveService";
import { ExpenseSchema } from "@utils/validations/ExpenseSchema";

class ExpensiveController {
    private service: ExpensiveService

    constructor() {
        this.service = new ExpensiveService();
    }

    async criar(req: Request, res: Response) {
        try {
            await ExpenseSchema.validate(req.body);

            const { valor, categoria, descricao, data } = req.body
            
            const expense = await this.service.criar({
                valor,
                categoria,
                descricao,
                data
            });
    
            res.status(201).json({ 
                message: 'Expensives created successfully.', 
                data: expense
            })
        } catch (err) {
            res.status(400).send({
                message: err instanceof yup.ValidationError 
                ? 'Erro de validação nos campos'
                : 'Erro ao criar despesa',
                error: err
            })
        }
    }
}

export default ExpensiveController;