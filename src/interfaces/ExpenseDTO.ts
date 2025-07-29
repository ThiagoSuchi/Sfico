import { Expense } from "@prisma/client"

interface ListExpensesDTO {
    total: number,
    pages: number,
    expenses: Expense[]
}

interface PaginateDTO {
    skip: number,
    per_page: number
}

interface FilterDTO {
    category?: string,
    date?: string
}

export { ListExpensesDTO, PaginateDTO, FilterDTO }