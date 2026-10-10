'use server';

import { auth } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createTransactionFormSchema } from '../_schemas/transaction';

const idSchema = z.string().uuid();

export async function updateTransaction(id: string, params: unknown) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) return { error: 'Faça login para editar a transação.' };

    const parsedId = idSchema.safeParse(id);
    const parsed = createTransactionFormSchema.safeParse(params);
    if (!parsedId.success || !parsed.success) return { error: 'Dados da transação inválidos.' };

    const result = await prisma.transaction.updateMany({
        where: { id: parsedId.data, userId: session.user.id },
        data: { ...parsed.data, updatedAt: new Date() },
    });
    if (result.count === 0) return { error: 'Transação não encontrada.' };

    revalidatePath('/');
    revalidatePath('/transactions');
    return { success: true };
}

export async function deleteTransaction(id: string) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) return { error: 'Faça login para excluir a transação.' };

    const parsedId = idSchema.safeParse(id);
    if (!parsedId.success) return { error: 'Transação inválida.' };

    const result = await prisma.transaction.deleteMany({
        where: { id: parsedId.data, userId: session.user.id },
    });
    if (result.count === 0) return { error: 'Transação não encontrada.' };

    revalidatePath('/');
    revalidatePath('/transactions');
    return { success: true };
}
