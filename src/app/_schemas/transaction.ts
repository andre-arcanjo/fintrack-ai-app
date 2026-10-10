import {
    TransactionType,
    TransactionCategory,
    TransactionPaymentMethod,
} from '../../generated/prisma/enums';

import z from 'zod';

export const createTransactionFormSchema = z.object({
    name: z.string().trim().nonempty('O nome é obrigatório'),
    amount: z.coerce.number()
        .positive({ error: 'O valor deve ser positivo.' })
        .multipleOf(0.01, { error: 'O valor deve ter no máximo duas casas decimais.' }),
    type: z.enum(TransactionType, { error: 'O tipo é obrigatório' }),
    category: z.enum(TransactionCategory, {
        error: 'A categoria é obrigatória.',
    }),
    paymentMethod: z.enum(TransactionPaymentMethod, {
        error: 'O método de pagamento é obrigatório.',
    }),
    date: z.union([
        z.iso.date({ error: 'Informe uma data válida.' })
            .transform((value) => new Date(`${value}T00:00:00.000Z`)),
        z.date(),
    ], { error: 'Informe uma data válida.' }),
});

export type CreateTransactionFormData = z.infer<typeof createTransactionFormSchema>;
