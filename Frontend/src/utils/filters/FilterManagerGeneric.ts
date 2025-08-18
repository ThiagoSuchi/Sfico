import { notItem } from "../render/notItemDOM";
import { paginateItems } from "../render/paginationDOM";
import { listItem } from "../render/managerItemsFunc";

export class FilterManagerGeneric {
    // Estado do filtro
    public isFiltering = false;
    public currentFilter: any = null;

    private divItems: HTMLDivElement;
    private updateCurrentData: (data: any) => void;
    private setupDeleteListener: () => void;
    private setupUpdateListener: () => void;
    private getAllItems: () => void;
    private apiService: any;
    private dataKey: string; // 'incomes' ou 'expenses'

    constructor(
        divItems: HTMLDivElement,
        updateCurrentData: (data: any) => void,
        setupDeleteListener: () => void,
        setupUpdateListener: () => void,
        getAllItems: () => void,
        apiService: any,
        dataKey: string
    ) {
        this.divItems = divItems;
        this.updateCurrentData = updateCurrentData;
        this.setupDeleteListener = setupDeleteListener;
        this.setupUpdateListener = setupUpdateListener;
        this.getAllItems = getAllItems;
        this.apiService = apiService;
        this.dataKey = dataKey;
    }

    async applyFilter(
        filter: { category?: string, date?: string },
        currentPage: number,
        skip: number,
        perPage: number
    ) {
        try {
            const filterWithPagination = { 
                ...filter, 
                skip, 
                perPage 
            };
            
            // Usa o método de filtro apropriado (filterIncome ou filterExpense)
            const methodName = this.dataKey === 'incomes' ? 'filterIncome' : 'filterExpense';
            const data = await this.apiService[methodName](filterWithPagination);

            // Atualiza cache através do callback
            this.updateCurrentData({
                ...data,
                fetchedAt: new Date().toISOString(),
                page: currentPage,
                skip
            });

            const pages = data.pages || 1;

            // Determina o contexto para paginação
            const context = this.dataKey === 'incomes' ? 'income' : 'expense';
            paginateItems(currentPage, pages, perPage, context);
            listItem(data[this.dataKey], this.divItems);

            this.setupDeleteListener();
            this.setupUpdateListener();

            return data;

        } catch (err) {
            console.log('Erro ao aplicar filtro: ', err);
            const itemType = this.dataKey === 'incomes' ? 'receita' : 'despesa';
            notItem(`Nenhuma ${itemType} encontrada.`, this.divItems);
            throw err;
        }
    }

    clearFilter() {
        this.isFiltering = false;
        this.currentFilter = null;
        this.getAllItems();
    }

    setFilterState(category?: string, date?: string) {
        this.isFiltering = true;
        this.currentFilter = { category, date };
    }
}
