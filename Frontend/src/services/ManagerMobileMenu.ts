export class ManagerMobileMenu {
    private menuToggle: HTMLButtonElement;
    private menuIcon: HTMLElement;
    private menu: HTMLElement;
    private menuOverlay: HTMLElement;
    private isMenuOpen: boolean = false;

    constructor() {
        this.menuToggle = document.getElementById('menu-toggle') as HTMLButtonElement;
        this.menuIcon = document.getElementById('menu-icon') as HTMLElement;
        this.menu = document.querySelector('.menu') as HTMLElement;
        this.menuOverlay = document.getElementById('menu-overlay') as HTMLElement;

        this.init();
    }

    private init(): void {
        // Event listener para o botão hambúrguer
        this.menuToggle.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Event listener para o overlay (fechar menu ao clicar fora)
        this.menuOverlay.addEventListener('click', () => {
            this.closeMenu();
        });

        // Fechar menu quando clicar em um link (mobile)
        const menuLinks = document.querySelectorAll('.links h3');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMenu();
                }
            });
        });

        // Listener para mudanças de tamanho da tela
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMenuOpen) {
                this.closeMenu();
            }
        });
    }

    private toggleMenu(): void {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    private openMenu(): void {
        this.isMenuOpen = true;
        this.menu.classList.add('active');
        this.menuOverlay.classList.add('active');
        this.menuToggle.classList.add('active');
        
        this.menuIcon.className = 'bi bi-x icon';
    }

    private closeMenu(): void {
        this.isMenuOpen = false;
        this.menu.classList.remove('active');
        this.menuOverlay.classList.remove('active');
        this.menuToggle.classList.remove('active');
        
        this.menuIcon.className = 'bi bi-list icon';
    }
}
