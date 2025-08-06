export class ApplicationSFICO {

    constructor() {
        this.exec();
    }

    private exec(): void {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.configAplication());
        } else {
            this.configAplication();
        }
    }

    private async configAplication(): Promise<void> {
        console.log('Configurando aplicação...');

        try {
            const { ManagerNavigation } = await import('../services/ManagerNavigation.js');
            new ManagerNavigation();
            console.log('Gerenciador de navegação inicializado.');

            const { ManagerMobileMenu } = await import('../services/ManagerMobileMenu.js');
            new ManagerMobileMenu();
            console.log('Gerenciador de menu móvel inicializado.');

            const { ManagerChartGlobal } = await import('../services/ManagerChartGlobal.js')
            new ManagerChartGlobal();
            const { ManagerChartMonthly } = await import('../services/ManagerChartMonthly.js')
            new ManagerChartMonthly();
            console.log('Gráficos inicializado.');

            const { ManagerSummary } = await import('../services/ManagerSummary.js')
            new ManagerSummary();
            console.log('Gerenciador de resumo financeiro inicializado.');
        } catch (err) {
            console.log('Erro ao inicializar aplicação, ', err);
        }

        
    }

}
