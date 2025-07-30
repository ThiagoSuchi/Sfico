import { Incomes } from "@prisma/client"

interface ListIncomesDTO {
    total: number,
    pages: number,
    incomes: Incomes[]
}

interface PaginateDTO {
    skip: number,
    per_page: number
}

interface FilterDTO {
    category?: string,
    date?: string
}

export { ListIncomesDTO, PaginateDTO, FilterDTO }