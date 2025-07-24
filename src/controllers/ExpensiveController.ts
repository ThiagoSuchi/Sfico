import ExpensiveService from "@services/ExpensiveService";
import { Request, Response } from "express";

class ExpensiveController {
    private service: ExpensiveService

    constructor() {
        this.service = new ExpensiveService();
    }

    async criar(req: Request, res: Response) {
        const { valor, categoria, descricao } = req.body
       
        const expesive = await this.service.criar({
            valor,
            categoria,
            descricao,
            data: new Date()
        });

        res.status(201).json({ 
            message: 'Expensives created successfully.', 
            data: expesive
        })
    }
}

export default ExpensiveController;