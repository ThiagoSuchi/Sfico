// Navegação entre seções

export class ManagerNavigation {
    private incomesBtn = document.getElementById('incomes')!;
    private expensesBtn = document.getElementById('expenses')!;
    private summaryBtn = document.getElementById('summary')!;
    private incomesSection = document.getElementById('general-incomes')!;
    private expensesSection = document.getElementById('general-expenses')!;
    private summarySection = document.getElementById('general-summary')!;

    constructor() {
        this.setupNavigation();
    }
    
    // Método para mostrar seção ativa
    private showSection(activeSection: HTMLElement, activeBtn: HTMLElement) {
        // Ocultar todas as seções
        const allSections = document.querySelectorAll('.general-section');
        allSections.forEach(section => section.classList.remove('active'));
    
        // Remover classe active de todos os botões do menu
        const allBtns = document.querySelectorAll('.links h3');
        allBtns.forEach(btn => btn.classList.remove('active'));
    
        // Mostrar seção ativa e adicionar classe active ao botão
        activeSection.classList.add('active');
        activeBtn.classList.add('active');
    }
    
    private setupNavigation() {
        // Event listeners para os botões do menu
        if (this.incomesBtn && this.incomesSection) {
            this.incomesBtn.addEventListener('click', () => {
                this.showSection(this.incomesSection, this.incomesBtn);
            });
        }
        
        if (this.expensesBtn && this.expensesSection) {
            this.expensesBtn.addEventListener('click', () => {
                this.showSection(this.expensesSection, this.expensesBtn);
            });
        }
        
        if (this.summaryBtn && this.summarySection) {
            this.summaryBtn.addEventListener('click', () => {
                this.showSection(this.summarySection, this.summaryBtn);
            });
        }

        // Mostrar seção de receitas por padrão
        if (this.incomesBtn && this.incomesSection) {
            this.showSection(this.incomesSection, this.incomesBtn);
        }
    }
}    

