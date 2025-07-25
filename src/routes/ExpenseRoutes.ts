import { Request, Response, Router } from "express";

import ExpenseController from "@controllers/ExpenseController";

const expenseController = new ExpenseController();

const router = Router();

router
    .post('/expenses', expenseController.criar.bind(expenseController))
    .get('/expenses', expenseController.listar.bind(expenseController))


export default router;