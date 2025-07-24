import { Request, Response, Router } from "express";

import ExpensiveController from "@controllers/ExpensiveController";

const expensiveController = new ExpensiveController();

const router = Router();

router.post('/expensives', expensiveController.criar.bind(expensiveController))

export default router;