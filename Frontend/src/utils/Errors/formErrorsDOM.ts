import type { AxiosError } from "axios";

function formErrors(resError: AxiosError, divNewItem: HTMLElement, overlay: HTMLElement) {
    clearFormErrors(divNewItem);

    const errors = (resError.response?.data as { errors?: any })?.errors;

    // Verificando erros de forma isolada
    const fieldErrors = {
        valor: hasFieldError(errors, 'valor'),
        categoria: hasFieldError(errors, 'categoria'),
        descricao: hasFieldError(errors, 'descrição'),
        data: hasFieldError(errors, 'data')
    }

    const inputContainer = divNewItem.querySelectorAll('.input-container')!;

    inputContainer.forEach((container) => {
        const input = container.querySelector('input, select');
        const fieldName = input?.getAttribute('name') || input?.getAttribute('id') || '';

        // Filtragem de erros
        let errorMessage = '';

        if (fieldName.includes('value')) {
            errorMessage = fieldErrors.valor || '';

        } else if (fieldName.includes('category')) {
            errorMessage = fieldErrors.categoria || '';

        } else if (fieldName.includes('desc')) {
            errorMessage = fieldErrors.descricao || '';

        } else if (fieldName.includes('date')) {
            errorMessage = fieldErrors.data || '';
            
        }

        if (errorMessage) {
            let paragraph = container.querySelector('.error-paragraph');

            // Verificando existência de páragrafo, para evitar duplicação
            if (!paragraph) {
                paragraph = document.createElement('p');
                (paragraph as HTMLParagraphElement).className = 'error-paragraph';
                (paragraph as HTMLParagraphElement).style.marginTop = '5px';
                (paragraph as HTMLParagraphElement).style.fontSize = '10pt';
                (paragraph as HTMLParagraphElement).style.color = '#D4002F';
                container.appendChild(paragraph);
            }

            paragraph.textContent = errorMessage;
        }

        // Verifica se já existe um ícone para evitar duplicação
        if (errorMessage && !container.querySelector('.input-icon')) {
            input?.classList.add('error');
            const iconError = document.createElement('i');
            iconError.className = 'bi bi-x-circle input-icon';
            container.appendChild(iconError);
        }
    });

    divNewItem.style.display = 'flex';
    overlay.style.display = 'flex'
}

// Filtra qual erro pertence a qual chamada
function hasFieldError(errors: string[], fieldName: string): string | null {
    const fieldError = errors.find(err =>
        err.toLowerCase().includes(fieldName.toLowerCase())
    );

    return fieldError || null;
}

// Limpa todos os erros após criar receita
function clearFormErrors(container: HTMLElement) {
    // removendo a class error
    const inputAndSelector = container.querySelectorAll('input, select');
    inputAndSelector.forEach(item => {
        item.classList.remove('error');
    });
    
    // Removendo todas as mensagens de erros
    const erroMessage = container.querySelectorAll('p');
    erroMessage.forEach(msg => msg.remove());
    
    // Removendo todos os ícones de erro
    const iconErro = container.querySelectorAll('i');
    iconErro.forEach(i => i.remove());
}

export { clearFormErrors, formErrors }