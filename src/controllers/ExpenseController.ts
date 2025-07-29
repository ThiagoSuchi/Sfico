//src/controller/ExpenseController.ts
import { Request, Response } from "express";
import * as yup from "yup";

import ExpensiveService from "@services/ExpenseService";
import { ExpenseSchema, ExpenseSchemaID } from "@utils/validations/ExpenseSchema";
import { formatDateISO } from "@utils/helpers/formatDate";

class ExpenseController {
    private service: ExpensiveService

    constructor() {
        this.service = new ExpensiveService();
    }

    async criar(req: Request, res: Response) {
        try {
            const dataJSON = req.body;
            const dateFormated = formatDateISO(dataJSON.data)

            await ExpenseSchema.validate({ ...dataJSON, dateFormated });

            const expense = await this.service.criar({
                ...dataJSON,
                data: dateFormated
            });

            res.status(201).json({
                message: 'Dispesa criada com sucesso.',
                expense
            })

        } catch (err) {
            console.log(err);
            res.status(400).send({
                message: err instanceof yup.ValidationError
                    ? 'Erro de validação nos campos'
                    : 'Erro ao criar despesa',
                error: err
            })
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const expenses = await this.service.listar(req);

            if (!expenses) {
                return res.status(404).json({ message: 'Nenhuma despesa foi criada.' })
            }

            res.status(200).send(expenses)

        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }

    async listarPorId(req: Request, res: Response) {
        try {
            const { id } = req.params || {};

            await ExpenseSchemaID.validate({ id })

            const expense = await this.service.listarPorId(id);

            if (!expense) {
                return res.status(404).json({ message: 'Despesa não encontrada.' })
            }

            res.status(200).json(expense);

        } catch (err) {
            if (err instanceof yup.ValidationError) {
                return res.status(400).json({
                    message: 'Erro de validação',
                    errors: err.errors
                })
            }

            console.log(err);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    }

    async listarPorFiltro(req: Request, res: Response) {
        try {
            const { categoria, data } = req.query;

            // Criando um objeto filter com campos válidos
            const filter: any = {};
            if (categoria && categoria !== 'undefined') filter.category = String(categoria);
            if (data && data !== 'undefined') filter.date = String(data);

            const expenses = await this.service.listarPorFiltro(filter);

            if (!expenses || expenses.length === 0) {
                return res.status(404).json({ message: 'Despesas não encontradas.' });
            }

            res.status(200).json({ message: 'Despesas encontradas: ', expenses });

        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Data inválida ou não informada.', error: err });
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const dataJSON = req.body;
            const id = req.params.id;
            const dateFormated = formatDateISO(dataJSON.data);

            await ExpenseSchema.validate({ ...dataJSON, dateFormated });

            const expense = await this.service.atualizar(id, { ...dataJSON, data: dateFormated });
            res.status(200).json({ message: 'Despesa atualizada com sucesso.', expense });

        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Erro ao atualizar a despesa, falha ao análisar o ID/BODY.', err });
        }
    }

    async deletarPorID(req: Request, res: Response) {
        try {
            const expenseId = req.params.id;

            await this.service.deletarPorID(expenseId);
            res.status(200).json({ message: 'Despesa deletada com sucesso' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Erro ao deletar despesa. Despesa não encontrada ou o ID fornecido é inválido'});
        }
    }

    async deletar(req: Request, res: Response) {
        try {
            await this.service.deletar();
            res.status(200).json({ message: 'Despesas apagadas com sucesso.' })
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Erro ao apagar despesas' })
        }
    }
}

export default ExpenseController;