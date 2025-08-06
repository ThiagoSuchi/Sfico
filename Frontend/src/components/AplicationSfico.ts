export class AplicationSFICO {

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
        } catch (err) {
            console.log('Erro ao inicializar aplicação, ', err);
        }

        
    }

}
