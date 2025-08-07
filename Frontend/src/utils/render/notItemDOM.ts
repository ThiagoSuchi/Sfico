export function notItem(msg: string, divItem: HTMLDivElement) {
    divItem.innerHTML = '';

    divItem.innerHTML += `
        <div class="not-item">
            <h3>${msg}</h3>
        </div>
    `
}