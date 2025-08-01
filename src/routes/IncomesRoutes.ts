//src/routes/IncomesRoutes.ts

import { Router } from "express";

import IncomeController from "@controllers/IncomeController";
import asyncError from "@middlewares/asyncError";

const incomeController = new IncomeController();
const router = Router();

router
    .post('/incomes', asyncError(incomeController.criar.bind(incomeController)))
    .get('/incomes', asyncError(incomeController.listar.bind(incomeController)))
    .get('/incomes/filter', asyncError(incomeController.listarPorFiltro.bind(incomeController)))
    .get('/incomes/:id', asyncError(incomeController.listarPorId.bind(incomeController)))
    .put('/incomes/:id', asyncError(incomeController.atualizar.bind(incomeController)))
    .delete('/incomes/:id', asyncError(incomeController.deletarPorID.bind(incomeController)))
    .delete('/incomes', asyncError(incomeController.deletar.bind(incomeController)))


export default router;