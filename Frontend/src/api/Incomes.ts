// import type { FilterDTO } from "../model/FilterModel";
// import type { Income } from "../model/Income";
import api from "./config";

class Incomes {
    async getAllIncomes() { 
        return api.get('/incomes')
            .then(res => res.data.incomes)
            .catch(err => console.log('Erro ao fazer busca', err))
    }
}

export default new Incomes();
