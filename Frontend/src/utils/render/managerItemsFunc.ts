import type { IncomeExpense } from "../../model/IncomeExpenseModel";
import { clearFormErrors } from "../Errors/formErrorsDOM";
import { modelMessage } from "./modelItemCreate";

function createItem(
    btnCreateItem: HTMLElement,
    btnNewItem: HTMLElement,
    divNewItem: HTMLElement,
    overlay: HTMLElement,
    onCreate: (data: IncomeExpense) => void
) {
    let valueItem: HTMLInputElement;
    let categoryItem: HTMLSelectElement;
    let descriptionItem: HTMLInputElement;
    let dateItem: HTMLInputElement;

    // Detecta se é income ou expense baseado na classe do div
    const isIncome = divNewItem.classList.contains('new-income');
    
    if (isIncome) {
        valueItem = document.getElementById('new-inc-value') as HTMLInputElement;
        categoryItem = document.getElementById('new-inc-category') as HTMLSelectElement;
        descriptionItem = document.getElementById('new-inc-description') as HTMLInputElement;
        dateItem = document.getElementById('new-inc-date') as HTMLInputElement;
    } else {
        valueItem = document.getElementById('new-exp-value') as HTMLInputElement;
        categoryItem = document.getElementById('new-exp-category') as HTMLSelectElement;
        descriptionItem = document.getElementById('new-exp-desc') as HTMLInputElement;
        dateItem = document.getElementById('new-exp-date') as HTMLInputElement;
    }

    btnNewItem.onclick = () => {
        divNewItem.style.display = 'flex';
        overlay.style.display = 'flex';

        valueItem.value = '';
        categoryItem.value = 'select';
        descriptionItem.value = '';
        dateItem.value = '';
    }

    const cancel = divNewItem.querySelector(isIncome ? '.cancel-income' : '.cancel-expense')!;

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

function listFilterItem(onFilter: (category?: string, date?: string) => void, type: 'income' | 'expense' = 'income') {
    const isIncome = type === 'income';
    
    const categorySelect = document.getElementById(isIncome ? 'inc-category' : 'exp-category') as HTMLSelectElement;
    const dateInput = document.getElementById(isIncome ? 'inc-monthYear' : 'exp-monthYear') as HTMLInputElement

    const applyFilter = () => {
        const categoryValue = categorySelect.value || undefined;
        const dateValue = dateInput.value || undefined;

        onFilter(categoryValue, dateValue)
    }

    categorySelect.addEventListener('change', applyFilter);
    dateInput.addEventListener('change', applyFilter);
}

function updateItem(
    currentData: any,
    divItem: HTMLDivElement,
    divNewIncome: HTMLDivElement,
    overlay: HTMLDivElement,
    onUpdate: (index: number, incomeData: IncomeExpense) => void
) {
    const items = divItem.querySelectorAll('.items');

    let valueItem: HTMLInputElement;
    let categoryItem: HTMLSelectElement;
    let descriptionItem: HTMLInputElement;
    let dateItem: HTMLInputElement;

    // Detecta se é income ou expense baseado na classe do div
    const isIncome = divNewIncome.classList.contains('new-income');
    
    if (isIncome) {
        valueItem = document.getElementById('new-inc-value') as HTMLInputElement;
        categoryItem = document.getElementById('new-inc-category') as HTMLSelectElement;
        descriptionItem = document.getElementById('new-inc-description') as HTMLInputElement;
        dateItem = document.getElementById('new-inc-date') as HTMLInputElement;
    } else {
        valueItem = document.getElementById('new-exp-value') as HTMLInputElement;
        categoryItem = document.getElementById('new-exp-category') as HTMLSelectElement;
        descriptionItem = document.getElementById('new-exp-desc') as HTMLInputElement;
        dateItem = document.getElementById('new-exp-date') as HTMLInputElement;
    }

    items.forEach((item, index) => {
        const editBtn = item.querySelector('.btn-edit')!;

        editBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Esconde o botão create e mostra o update
            const updateBtn = divNewIncome.querySelector(isIncome ? '.update-income' : '.update-expense') as HTMLButtonElement;
            updateBtn.style.display = 'block';
            const createBtn = divNewIncome.querySelector(isIncome ? '.create-income' : '.create-expense') as HTMLButtonElement;
            createBtn.style.display = 'none';

            divNewIncome.style.display = 'flex';
            overlay.style.display = 'flex';

            const inputValues = {
                valor: valueItem.value = currentData[index].valor,
                categoria: categoryItem.value = currentData[index].categoria,
                descricao: descriptionItem.value = currentData[index].descricao || '',
                data: dateItem.value = currentData[index].data.split('/').reverse().join('-'),
            }

            updateBtn.onclick = (e) => {
                // Verificando se há alguma alteração
                const hasChange = (
                    inputValues.valor !== valueItem.value ||
                    inputValues.categoria !== categoryItem.value ||
                    inputValues.descricao !== (descriptionItem.value || '') ||
                    inputValues.data !== dateItem.value
                )

                if (!hasChange && updateBtn) {
                    modelMessage('Por favor altere algum campo para poder prosseguir com a atualização.');
                    return
                }

                const incomeData: IncomeExpense = {
                    valor: valueItem.value,
                    categoria: categoryItem.value,
                    descricao: descriptionItem.value || '',
                    data: dateItem.value
                }

                // Fecha o modal
                divNewIncome.style.display = 'none';
                overlay.style.display = 'none';

                updateBtn.style.display = 'none';
                createBtn.style.display = 'block';

                // Retorno o data que é o item receita/despesa
                onUpdate(index, incomeData);
            }

            const cancelBtn = divNewIncome.querySelector(isIncome ? '.cancel-income' : '.cancel-expense') as HTMLButtonElement;

            cancelBtn.onclick = () => {
                updateBtn.style.display = 'none';
                createBtn.style.display = 'block';
            }
        })
    })
}

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

export { createItem, listItem, listFilterItem, updateItem, deleteItem };