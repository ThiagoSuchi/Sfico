export const parseValue = (value) => {
    if (!value) return 0;

    return Number(
        value
        .replace(/\./g, '')// remove pontos
        .replace(',', '.')// troca vírgula por ponto decimal
    )
}