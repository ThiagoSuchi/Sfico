import type { Expense } from "../../model/IncomeExpenseModel";

export function listItem(data: Expense[], divItems: HTMLDivElement) {
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