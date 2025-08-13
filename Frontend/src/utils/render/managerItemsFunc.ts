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
        divNewItem.style.display = 'flex'
        overlay.style.display = 'flex'
    })

    const cancel = divNewItem.querySelector('.cancel')!;

    cancel.addEventListener('click', () => {
        divNewItem.style.display = 'none'
        overlay.style.display = 'none'
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

export { listItem, createItem };