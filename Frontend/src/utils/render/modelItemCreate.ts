function modelCreatedOrUpdatedOrDeleted(msgItem: string) {
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

function modelMessage(msgAlert: string) {
    const oldAlert = document.querySelector('.top-alert');

    if (oldAlert) oldAlert.remove();

    const alert = document.createElement('div');
    alert.className = 'top-alert';
    alert.textContent = msgAlert;

    document.body.appendChild(alert);

    // Força reflow e mostra o alerta, ou seja, a cada chamada 
    // a mensagem recarrega e aparece com uma animação.
    requestAnimationFrame(() => {
        alert.classList.add('show');
    });

    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => alert.remove(), 300);
    }, 3500);
}

export { modelCreatedOrUpdatedOrDeleted, modelMessage }