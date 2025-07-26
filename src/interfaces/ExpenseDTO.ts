type ExpenseDTO = {
    id: string,
    valor: number
    categoria: string,
    descricao: string | null,
    data: Date,
    createdAt: Date,
    updatedAt: Date
}

interface ListExpensesDTO {
    total: number,
    pages: number,
    expense: ExpenseDTO[]
}

export default ListExpensesDTO