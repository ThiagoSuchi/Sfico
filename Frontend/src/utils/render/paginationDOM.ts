const divPaginate = document.querySelector('.pagination') as HTMLDivElement;
const ul = divPaginate.querySelector('ul') as HTMLUListElement;
const btnNext = document.querySelector('.btn-next') as HTMLButtonElement;
const btnPrev = document.querySelector('.btn-prev') as HTMLButtonElement;

let globalCurrentPage = 1;
let globalTotalPages = 0;
let globalPerPage = 5;

export function paginateItems(currentPage: number, totalPages: number, per_page: number): number {
    globalCurrentPage = currentPage;
    globalTotalPages = totalPages;
    globalPerPage = per_page;

    // Remove listeners antigos
    btnNext.removeEventListener('click', handleNext);
    btnPrev.removeEventListener('click', handlePrev);

    // Adiciona novos listeners
    btnNext.addEventListener('click', handleNext);
    btnPrev.addEventListener('click', handlePrev);

    // Cria as páginas com lógica deslizante
    loadPageDom(totalPages, currentPage);

    // Define a página ativa inicial
    stylesLi(currentPage);

    const skip = (currentPage - 1) * per_page;
    return skip;
}

// Lógica para o botão de páginação 'próximo'
function handleNext() {
    if (globalCurrentPage < globalTotalPages) {
        globalCurrentPage++;
        const skip = (globalCurrentPage - 1) * globalPerPage;
        
        // Recria os lis com nova numeração
        loadPageDom(globalTotalPages, globalCurrentPage);
        stylesLi(globalCurrentPage, 'next');
        
        // Lança events listeners
        window.dispatchEvent(new CustomEvent('pageChanged', {
            detail: { page: globalCurrentPage, skip }
        }));
    }
}

// Lógica para o botão de páginação 'anterior'
function handlePrev() {
    if (globalCurrentPage > 1) {
        globalCurrentPage--;
        const skip = (globalCurrentPage - 1) * globalPerPage;
        
        // Recria os lis com nova numeração
        loadPageDom(globalTotalPages, globalCurrentPage);
        stylesLi(globalCurrentPage, 'prev');
        
        window.dispatchEvent(new CustomEvent('pageChanged', {
            detail: { page: globalCurrentPage, skip }
        }));
    }
}

function loadPageDom(totalPages: number, currentPage: number) {
    ul.innerHTML = '';

    const show = 3; // Sempre mostra 3 páginas
    
    // Calcula quais páginas mostrar baseado na página atual
    let startPage: number;
    
    if (currentPage === 1) {
        // Se estiver na página 1: mostra [1, 2, 3]
        startPage = 1;
    } else if (currentPage === totalPages) {
        // Se estiver na última página: mostra [total-2, total-1, total]
        startPage = Math.max(1, totalPages - 2);
    } else {
        // Se estiver no meio: mostra [atual-1, atual, atual+1]
        startPage = Math.max(1, currentPage - 1);
    }
    
    const endPage = Math.min(totalPages, startPage + show - 1);
    
    // Ajusta startPage se não conseguir mostrar 3 páginas
    if (endPage - startPage + 1 < show && totalPages >= show) {
        startPage = Math.max(1, endPage - show + 1);
    }
    
    // Cria os lis das páginas calculadas
    for (let i = startPage; i <= endPage; i++) {
        ul.innerHTML += `
            <li value=${i}>${i}</li>
        `;
    }
}

// Adiciona a classe .active na li principal
function stylesLi(page?: number, way?: string) {
    const lis = ul.querySelectorAll('li') as NodeListOf<HTMLLIElement>;

    // Remove active de todos os lis primeiro
    lis.forEach(li => li.classList.remove('active'));

    // Adiciona active apenas ao li correto
    lis.forEach(li => {
        const liValue = li.getAttribute('value');
        
        if (liValue === String(page)) {
            li.classList.add('active');
        }
    });
}