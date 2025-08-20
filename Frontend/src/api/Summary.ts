//src/api/Summary.ts

import type { DateDTO } from "../model/DateDTO";
import api from "./config";

export class Summary {
    summaryGlobal() {
        return api.get('/summary/all')
            .then(res => res.data)
            .catch(err => {
                console.log('Erro ao fazer resumo global: ', err);
                return err.message;
            })
    }

    summaryMonthly({ano, mes}: DateDTO) {
        return api.get(
            '/summary', 
            { params: { ano, mes } }
        )
        .then(res => res.data)
        .catch(err => {
            console.log('Erro ao fazer resumo mensal: ', err);
            return err.message;
        })
    }
}