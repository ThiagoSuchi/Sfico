//src/api/Incomes.ts

// import type { FilterDTO } from "../model/FilterModel";
import type { IncomeExpense } from "../model/IncomeExpenseModel";
import type { PaginatedIncome } from "../model/Paginated";
import api from "./config";
import type { FilterDTO } from "../model/FilterModel";

class Incomes {
    createIncomes({ valor, categoria, descricao, data }: IncomeExpense) {
        return api.post(
            '/incomes',
            { valor, categoria, descricao, data }
        )
        .then(res => res)
        .catch(function (err) {
            console.log('Erro ao criar receita: ', err.response.data)
            throw err
        })
    }

    getAllIncomes(skip: number = 0, perPage: number = 7) {
        return api.get<PaginatedIncome<IncomeExpense>>(
            `/incomes?skip=${skip}&per_page=${perPage}`
        )
        .then(res => res.data)
        .catch(err => {
            console.log('Erro ao fazer busca', err);
            return null;
        })
    }

    filterIncome({ 
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

        return api.get<PaginatedIncome<IncomeExpense>>(
            `/incomes/filter?${params}`,
        )
        .then(res => res.data)
        .catch(err => {
            console.log('Erro ao buscar receitas filtradas: ', err);
            throw err
        })
    }

    updateIncomeById({ id, ...data }: IncomeExpense) {
        return api.put(`/incomes/${id}`, data)
            .then(res => res)
            .catch(err => {
                console.log('erro ao atualizar receita: ', err);
                throw err
            })
    }

    deleteIncomeById(id: string) {
        return api.delete(`/incomes/${id}`)
            .then(res => res)
            .catch(err => {
                console.log('Erro ao deletar receita', err);
                throw err
            })
    }
}

export default new Incomes();
