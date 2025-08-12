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
        })
        .test('is-positive', 'O valor deve ser maior que zero', (value) => {
            return value ? parseFloat(value) > 0 : false;
        }),
    categoria: yup
        .string()
        .required('O campo categoria é obrigatório.')
        .test('not-select', 'Por favor selecione uma categoria válida.', (value) => {
            return value !== 'select';
        }),
    descricao: yup
        .string()
        .min(4, 'A descrição deve conter no mínimo 4 caracteres.')
        .max(50, 'A descrição deve conter no máximo 50 caracteres.')
        .notRequired(),
    dateFormated: yup
        .date()
        .typeError('O campo data deve ser uma data válida exemplo: dd/mm/yyyy.')
        .required('O campo data é obrigatório.')
})