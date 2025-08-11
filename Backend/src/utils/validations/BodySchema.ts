import * as yup from "yup";

export const BodySchemaID = yup.object({
    id: yup.string().uuid('O ID fornecido é inválido.')
})

export const BodySchema = yup.object({
    valor: yup
        .string()
        .required('O campo valor é obrigatório.')
        .matches(/^\d+(\.\d{1,3})?$/, 'O valor deve ser um número válido (ex: 2.300)')
        .test('is-valid-number', 'O valor deve ser um número válido', (value) => {
            return value ? !isNaN(parseFloat(value)) : false;
        }),
    categoria: yup
        .string()
        .strict(true)
        .typeError('O valor de categoria deve ser um texto')
        .required('O campo categoria é obrigatório.'),
    descricao: yup
        .string()
        .notRequired(),
    dateFormated: yup
        .date()
        .typeError('O campo data deve ser uma data válida exemplo: dd/mm/yyyy.')
        .required('O campo data é obrigatório.')
})