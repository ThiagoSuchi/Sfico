import { Router } from "express";

import ExpenseController from "@controllers/ExpenseController";

const expenseController = new ExpenseController();
const router = Router();

router
    .post('/expenses', expenseController.criar.bind(expenseController))
    .get('/expenses', expenseController.listar.bind(expenseController))
    .get('/expenses/:id', expenseController.listarPorId.bind(expenseController))
    // .put('/expenses/:id', expenseController.atualizarPorId.bind(expenseController))
    // .delete('/expenses/:id', expenseController.deletarPorId.bind(expenseController))


export default router;