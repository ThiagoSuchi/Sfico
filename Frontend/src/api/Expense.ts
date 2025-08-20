//src/api/Expense.ts

import type { IncomeExpense } from "../model/IncomeExpenseModel";
import type { PaginatedExpense } from "../model/Paginated";
import api from "./config";
import type { FilterDTO } from "../model/FilterModel";

class Expenses {
    createExpense({ valor, categoria, descricao, data }: IncomeExpense) {
        return api.post(
            '/expenses',
            { valor, categoria, descricao, data }
        )
        .then(res => res)
        .catch(function (err) {
            console.log('Erro ao criar despesa: ', err.response.data)
            throw err
        })
    }

    getAllExpenses(skip: number = 0, perPage: number = 7) {
        return api.get<PaginatedExpense<IncomeExpense>>(
            `/expenses?skip=${skip}&per_page=${perPage}`
        )
        .then(res => res.data)
        .catch(err => {
            console.log('Erro ao fazer busca', err);
            return null;
        })
    }

    filterExpense({ 
        category, 
        date,
        skip = 0,
        perPage = 7
     }: FilterDTO & { skip?: number, perPage?: number }) {
        const params = new URLSearchParams();

       if (category && category !== 'select') {
            params.append('category', category);
        }
        if (date) {
            params.append('date', date);
        }
        params.append('skip', skip.toString());
        params.append('per_page', perPage.toString());

        return api.get<PaginatedExpense<IncomeExpense>>(
            `/expenses/filter?${params}`,
        )
        .then(res => res.data)
        .catch(err => {
            console.log('Erro ao buscar despesas filtradas: ', err);
            throw err
        })
    }

    updateExpenseById({ id, ...data }: IncomeExpense) {
        return api.put(`/expenses/${id}`, data)
            .then(res => res)
            .catch(err => {
                console.log('erro ao atualizar despesa: ', err);
                throw err
            })
    }

    deleteExpenseById(id: string) {
        return api.delete(`/expenses/${id}`)
            .then(res => res)
            .catch(err => {
                console.log('Erro ao deletar despesa', err);
                throw err
            })
    }
}

export default new Expenses();
