//src/routes/ExpensesRoutes.ts

import { Router } from "express";

import ExpenseController from "@controllers/ExpenseController";
import asyncError from "@middlewares/asyncError";

const expenseController = new ExpenseController();
const router = Router();

router
    .post('/expenses', asyncError(expenseController.criar.bind(expenseController)))
    .get('/expenses', asyncError(expenseController.listar.bind(expenseController)))
    .get('/expenses/filter', asyncError(expenseController.listarPorFiltro.bind(expenseController)))
    .get('/expenses/:id', asyncError(expenseController.listarPorId.bind(expenseController)))
    .put('/expenses/:id', asyncError(expenseController.atualizar.bind(expenseController)))
    .delete('/expenses/:id', asyncError(expenseController.deletarPorID.bind(expenseController)))
    .delete('/expenses', asyncError(expenseController.deletar.bind(expenseController)))


export default router;