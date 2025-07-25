function formatDate(date: any): Date {
    if (typeof date !== 'string') return date

    const [dia, mes, ano] = date.split('/');
    return new Date(`${ano}-${mes}-${dia}`)
}

export default formatDate;