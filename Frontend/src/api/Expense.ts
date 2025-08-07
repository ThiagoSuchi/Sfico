// import type { FilterDTO } from "../model/FilterModel";
// import type { Income } from "../model/Income";
import api from "./config";

class Expenses {
    async getAllExpense() { 
        return api.get('/expenses')
            .then(res => res.data.expenses)
            .catch(err => console.log('Erro ao fazer busca', err))
    }
}

export default new Expenses();
