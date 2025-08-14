//src/api/Incomes.ts

// import type { FilterDTO } from "../model/FilterModel";
import axios from "axios";
import type { IncomeExpense } from "../model/IncomeExpenseModel";
import type { PaginatedIncome } from "../model/Paginated";
import api from "./config";

class Incomes {
    async createIncomes({ valor, categoria, descricao, data }: IncomeExpense) {
        return api.post('/incomes', { valor, categoria, descricao, data })
            .then(res => res)
            .catch(function (err) {
                console.log('Erro ao criar receita: ', err.response.data)
                throw err
            })
    }
    
    async getAllIncomes(skip: number = 0, perPage: number = 7) { 
        return api.get<PaginatedIncome<any>>(`/incomes?skip=${skip}&per_page=${perPage}`)
            .then(res => res.data)
            .catch(err => {
                console.log('Erro ao fazer busca', err) ;
                return null;
            })
    }

    // async updateIncomeById

    async deleteIncomeById(id: string) {
        return api.delete(`/incomes/${id}`)
            .then(res => res)
            .catch(err => {
                console.log('Erro ao deletar receita', err);   
                throw err             
            })
    }
}

export default new Incomes();
