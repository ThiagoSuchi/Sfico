import { Expense } from "@prisma/client";
import ExpensiveRepository from "@repositories/ExpensiveRepository";
import ExpensiveDTO from "src/types/ExpensiveDTO";

class ExpensiveService {
    private repository: ExpensiveRepository;

    constructor() {
        this.repository = new ExpensiveRepository();
    }

    async criar({ valor, categoria, descricao, data }: ExpensiveDTO): Promise<Expense> {
        const expense = await this.repository.criar({
            valor,
            categoria,
            descricao,
            data
        });
        
        return expense;
    }
}

export default ExpensiveService