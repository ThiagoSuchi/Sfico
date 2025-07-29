import { Router } from "express";

import ExpenseController from "@controllers/ExpenseController";

const expenseController = new ExpenseController();
const router = Router();

router
    .post('/expenses', expenseController.criar.bind(expenseController))
    .get('/expenses', expenseController.listar.bind(expenseController))
    .get('/expenses/filter', expenseController.listarPorFiltro.bind(expenseController))
    .get('/expenses/:id', expenseController.listarPorId.bind(expenseController))
    .put('/expenses/:id', expenseController.atualizar.bind(expenseController))
    .delete('/expenses/:id', expenseController.deletarPorID.bind(expenseController))
    .delete('/expenses', expenseController.deletar.bind(expenseController))


export default router;