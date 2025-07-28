import { Expense } from "@prisma/client"

interface ListExpensesDTO {
    total: number,
    pages: number,
    expenses: Expense[]
}

export default ListExpensesDTO