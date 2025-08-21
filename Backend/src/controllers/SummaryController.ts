//src/controllers/SummaryController.ts

import SummaryRepository from "@repositories/SummaryRepository";
import SummaryService from "@services/SummaryService";
import AppError from "@utils/errors/AppErrors";
import { Request, Response } from "express";

class SummaryController {
    private service: SummaryService;

    constructor() {
        this.service = new SummaryService();
    }

    async allEntries(req: Request, res: Response) {
        const result = await this.service.allEntries();

        if (!result || result.valorTotalReceitas === null || result.valorTotalDespesas === null) {
            throw new AppError("Nenhum registro foi encontrado", 404);
        }

        res.status(200).json({ message: "Listagem completa de receitas e despesas: ", result })
    }

    // Total de despesas e receitas por mês e ano, e o saldo correspondente
    async getMonthlySummary(req: Request, res: Response) {
        const { ano, mes } = req.query;

        const year = Number(ano);
        const month = Number(mes)

        if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
            throw new AppError("Erro ao processar ano ou mês, por favor insira informações válidas: \n ano: 2025 \n mes: 10");
        }

        const result = await this.service.summaryByMonthAndYear(month, year);

        if (!result) {
            throw new AppError("Não há registros no mês/ano informado.", 404);
        }

        res.status(200).json({ message: "Este é o resumo mensal gerado:", result});
    }
}

export default SummaryController