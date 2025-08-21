import { Expense, Incomes } from "prisma/prisma-client"

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
    date?: string,
    skip?: number,
    per_page?: number
}

export { ListDTO, PaginateDTO, FilterDTO }