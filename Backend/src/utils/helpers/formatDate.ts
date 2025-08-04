function formatDateISO(date: string): Date {
    if (typeof date !== 'string') return date
    
    const [dia, mes, ano] = date.split('/');
    return new Date(`${ano}-${mes}-${dia}`)// formatando a data para o padrão ISO
}

function formatedDateDMY(date: Date): string {
    // Transformando o Date em string
    const dateString = date.toISOString();

    // Capturando o ano, mês e dia do campo data
    // separando o dateString em um array de strings com 2 itens 
    // os que estão antes do T e os que estão depois do T
    const [ano, mes, dia] = dateString.split('T')[0].split('-');
    return `${dia}/${mes}/${ano}` // formatando a data para o padrão DMY(day/month/year)
}

export { formatDateISO, formatedDateDMY };