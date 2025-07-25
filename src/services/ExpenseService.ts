import { Expense } from "@prisma/client";
import ExpenseRepository from "@repositories/ExpenseRepository";
import ExpenseDTO from "src/types/ExpenseDTO";

class ExpenseService {
    private repository: ExpenseRepository;

    constructor() {
        this.repository = new ExpenseRepository();
    }

    async criar({ valor, categoria, descricao, data }: ExpenseDTO): Promise<Expense> {
        console.log('POST/criar - ExpenseService.ts');
        
        const expense = await this.repository.criar({
            valor,
            categoria,
            descricao,
            data
        });
        
        return expense;
    }

    async listar(): Promise<Object[]> {
        console.log('GET/listar - ExpenseService.ts');
        
        const expense = await this.repository.listar();

        if (!expense) {
            throw new Error("Nenhuma despesa foi encontrada.");
        }

        const result = expense.map((item) => {
            // Transformando o Date em string
            const dateString = item.data.toISOString();

            // Capturando o ano, mês e dia do campo data
            // separando o dateString em um array de strings com 2 itens 
            // os que estão antes do T e os que estão depois do T
            const [ano, mes, dia] = dateString.split('T')[0].split('-');

            return {
                ...item,
                data: `${dia}/${mes}/${ano}`
            };
        })
        
        return result;
    }
}

export default ExpenseService;