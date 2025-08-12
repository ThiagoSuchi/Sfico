import type { AxiosError } from "axios";

export function formErrors(resError: AxiosError, divNewIncome: HTMLElement, overlay: HTMLElement) {
    const inputs = divNewIncome.querySelectorAll('input')!;
    inputs.forEach((item) => {
        item.classList.add('error');
    })

    const inputContainer = divNewIncome.querySelectorAll('.input-container')!;
    inputContainer.forEach((input) => {
        // Verifica se já existe um ícone para evitar duplicação
        if (!input.querySelector('.input-icon')) {
            const iconError = document.createElement('i');
            iconError.className = 'bi bi-x-circle input-icon';
            
            input.appendChild(iconError);
        }
    })

    const select = divNewIncome.querySelector('select')!;
    select.classList.add('error')

    divNewIncome.style.display = 'flex';
    overlay.style.display = 'flex'
}