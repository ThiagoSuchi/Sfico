import { Expense, Incomes } from "@prisma/client"

interface ListDTO {
    total: number,
    pages: number,
    incomes?: Incomes[],
    expenses?: Expense[],
}

interface PaginateDTO {
    skip: number,
    per_page: number
}

interface FilterDTO {
    category?: string,
    date?: string
}

export { ListDTO, PaginateDTO, FilterDTO }