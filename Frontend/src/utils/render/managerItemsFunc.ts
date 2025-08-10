import type { IncomeExpense } from "../../model/IncomeExpenseModel";

function listItem(data: IncomeExpense[], divItems: HTMLDivElement) {
    divItems.innerHTML = '';

    data.forEach((item) => {
        divItems.innerHTML += `
            <div class="items">
                <div class="value">
                    <h2>+R$ ${item.valor}</h2>
                    <div class="tags">
                        <p><span>${item.categoria}</span></p>
                        <p>${item.descricao}</p>
                    </div>
                </div>
        
                <div class="edit">
                    <p class="date">${item.data}</p>
                    <button class="btn-edit"><i class="bi bi-pencil-square"></i> Editar</button>
                    <button class="btn-delete"><i class="bi bi-trash3"></i> Excluir</button>
                </div>
            </div>
        `
    });
}

function createItem(btnNewItem: HTMLElement, divNewItem: HTMLElement) {
    const overlay = document.getElementById('new-item-overlay') as HTMLDivElement;
    const inputError = document.querySelector('.input-container') as HTMLInputElement;

    btnNewItem.addEventListener('click', () => {
        
        divNewItem.style.display = 'flex'
        overlay.style.display = 'flex'
    })

    const cancel = divNewItem.querySelector('.cancel')!;

    cancel.addEventListener('click', () => {
        divNewItem.style.display = 'none'
        overlay.style.display = 'none'
    })
}

export { listItem, createItem };