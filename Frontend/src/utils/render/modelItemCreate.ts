export function modelItemCreatedOrDelete(msgItem: string) {
    let modal = document.querySelector('.modal') as HTMLElement;

    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'modal';
        document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
        <i class="bi bi-check2-circle"></i> ${msgItem}
    `;
    
    // Adiciona a classe active para mostrar o modal
    modal.classList.add('active');

    setTimeout(() => {
        modal.classList.remove('active');
    }, 3500);
}