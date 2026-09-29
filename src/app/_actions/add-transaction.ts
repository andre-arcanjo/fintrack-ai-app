'use server';

import { type CreateTransactionFormData, createTransactionFormSchema } from "../_schemas/transaction";
import { prisma } from "@/src/lib/prisma";

export const addTransaction = async (params: CreateTransactionFormData) => {
    const data = createTransactionFormSchema.parse(params)

    await prisma.transaction.create({
        data
    })
}