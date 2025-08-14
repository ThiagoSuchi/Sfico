import type { IncomeExpense } from "../../model/IncomeExpenseModel";
import { clearFormErrors } from "../Errors/formErrorsDOM";

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

function createItem(
    btnCreateItem: HTMLElement,
    btnNewItem: HTMLElement,
    divNewItem: HTMLElement,
    overlay: HTMLElement,
    onCreate: (data: IncomeExpense) => void
) {
    const isIncome = divNewItem.classList.contains('new-income');

    let valueItem: HTMLInputElement;
    let categoryItem: HTMLSelectElement;
    let descriptionItem: HTMLInputElement;
    let dateItem: HTMLInputElement;

    if (isIncome) {
        valueItem = document.getElementById('new-inc-value') as HTMLInputElement;
        categoryItem = document.getElementById('new-inc-category') as HTMLSelectElement;
        descriptionItem = document.getElementById('new-inc-description') as HTMLInputElement;
        dateItem = document.getElementById('new-inc-date') as HTMLInputElement;
    } else {
        valueItem = document.getElementById('new-exp-value') as HTMLInputElement;
        categoryItem = document.getElementById('new-exp-category') as HTMLSelectElement;
        descriptionItem = document.getElementById('new-epx-desc') as HTMLInputElement;
        dateItem = document.getElementById('new-exp-date') as HTMLInputElement;
    }

    btnNewItem.addEventListener('click', () => {
        divNewItem.style.display = 'flex';
        overlay.style.display = 'flex';
    })

    const cancel = divNewItem.querySelector('.cancel')!;

    cancel.addEventListener('click', () => {
        divNewItem.style.display = 'none';
        overlay.style.display = 'none';

        valueItem.value = '';
        categoryItem.value = 'select';
        descriptionItem.value = '';
        dateItem.value = '';

        clearFormErrors(divNewItem);
    })

    // Criando um item
    btnCreateItem.addEventListener('click', (e) => {
        e.preventDefault();

        const incomeData: IncomeExpense = {
            valor: valueItem.value,
            categoria: categoryItem.value,
            descricao: descriptionItem.value || '',
            data: dateItem.value
        }

        // Fecha o modal
        divNewItem.style.display = 'none';
        overlay.style.display = 'none';

        // Retorno o data que é o item receita/despesa
        onCreate(incomeData);
    })
}



// Função utilitária para atualização dos items

function deleteItem(divItems: HTMLDivElement, onDelete: (index: number) => void) {
    const items = divItems.querySelectorAll('.items');

    items.forEach((item, index) => {
        const btnDelete = item.querySelector('.btn-delete')! as HTMLButtonElement;

        btnDelete.addEventListener('click', () => {
            const existingConfirmation = item.querySelector('.delete-confirmation');
            
            if (existingConfirmation) {
                existingConfirmation.remove();
                return;
            }

            const confirmationBox = document.createElement('div');
            confirmationBox.className = 'delete-confirmation show';
            confirmationBox.innerHTML = `
                <div class="delete-content">
                    <i class="bi bi-exclamation-triangle"></i>
                    <p>Você tem certeza que deseja excluir?</p>
                    <div class="delete-actions">
                        <button class="btn-confirm">Excluir</button>
                        <button class="btn-cancel">Cancelar</button>
                    </div>
                </div>
            `;

            item.appendChild(confirmationBox);

            const cancelBtn = confirmationBox.querySelector('.btn-cancel');
            const confirmBtn = confirmationBox.querySelector('.btn-confirm');

            cancelBtn?.addEventListener('click', () => {
                confirmationBox.remove();
            });

            confirmBtn?.addEventListener('click', () => {
                onDelete(index);
                confirmationBox.remove();
            });

            
        })
    })
}

export { listItem, createItem, deleteItem };