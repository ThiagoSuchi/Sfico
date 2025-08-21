//src/routes/SummaryRoutes.ts

import { Router } from "express";

import SummaryController from "../controllers/SummaryController";
import asyncError from "../middlewares/asyncError";

const summaryController = new SummaryController()

const router = Router();

router
    .get('/summary', asyncError(summaryController.getMonthlySummary.bind(summaryController)))
    .get('/summary/all', asyncError(summaryController.allEntries.bind(summaryController)))

export default router;