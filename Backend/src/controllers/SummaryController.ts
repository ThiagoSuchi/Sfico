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
        const finance = await this.service.allEntries();

        if (!finance || finance.valorTotalReceitas === null || finance.valorTotalDespesas === null) {
            throw new AppError("Nenhum registro foi encontrado", 404);
        }

        res.status(200).json({ message: "Listagem completa de receitas e despesas: ", finance })
    }

    // Total de despesas e receitas por mês e ano, e o saldo correspondente
    async getMonthlySummary(req: Request, res: Response) {
        const { ano, mes } = req.body;

        if (isNaN(ano) || isNaN(mes) || mes < 1 || mes > 12) {
            throw new AppError("Erro ao processar ano ou mês, por favor insira informações válidas: \n ano: 2025 \n mes: 10");
        }

        const result = await this.service.summaryByMonthAndYear(mes, ano);

        if (!result) {
            throw new AppError("Não há registros no mês/ano informado.", 404);
        }

        res.status(200).json({ message: "Este é o saldo mensal gerado:", result});
    }
}

export default SummaryController