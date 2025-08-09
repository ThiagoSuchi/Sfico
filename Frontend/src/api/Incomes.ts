//src/api/Incomes.ts

// import type { FilterDTO } from "../model/FilterModel";
// import type { Income } from "../model/Income";
import type { PaginatedIncome } from "../model/Paginated";
import api from "./config";

class Incomes {
    async getAllIncomes(skip: number = 0, perPage: number = 7) { 
        return api.get<PaginatedIncome<any>>(`/incomes?skip=${skip}&per_page=${perPage}`)
            .then(res => res.data)
            .catch(err => {
                console.log('Erro ao fazer busca', err) ;
                return null;
            })
    }
}

export default new Incomes();
