export class ManagerSummary {
    private monthlyBtn = document.getElementById('monthly')! as HTMLButtonElement;
    private globalBtn = document.getElementById('global')! as HTMLButtonElement;
    // private monthlySection = document.getElementById('monthly-section')! as HTMLDivElement;
    private globalSection = document.querySelector('.global-section')! as HTMLDivElement;

    constructor() {
        this.init();
    }

    private init(): void {
        // Definir estado inicial (mensal ativo)
        this.setActiveButton(this.monthlyBtn);

        // Adicionar event listeners
        this.monthlyBtn.addEventListener('click', () => {
            this.setActiveButton(this.monthlyBtn);
            this.globalSection.classList.remove('active')
        });

        this.globalBtn.addEventListener('click', () => {
            this.setActiveButton(this.globalBtn);
            this.globalSection.classList.add('active')
        });

    }

    private setActiveButton(activeBtn: HTMLElement): void {
        // Remover classe active de todos os botões
        this.monthlyBtn.classList.remove('active');
        this.globalBtn.classList.remove('active');

        // Adicionar classe active no botão clicado
        activeBtn.classList.add('active');
    }
}