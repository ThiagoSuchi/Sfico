interface PaginatedIncome<T> {
    total: number;
    pages: number;
    skip: number;
    per_page: number;
    incomes: T[];
}

interface PaginatedExpense<T> {
    total: number;
    pages: number;
    skip: number;
    per_page: number;
    expenses: T[];
}

export type { PaginatedExpense, PaginatedIncome }