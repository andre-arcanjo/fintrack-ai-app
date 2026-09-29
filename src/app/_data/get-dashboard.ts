import { TransactionType } from '@/src/generated/prisma/enums';
import { prisma } from '@/src/lib/prisma';

export const getDashboard = async (month: string) => {
    const year = 2026;

    const startOfMonth = new Date(`${year}-${month}-01T00:00:00.000Z`);

    const startofNextMonth = new Date(
        month === '12'
            ? `${year + 1}-01-01T00:00:00.000Z`
            : `${year}-${String(Number(month) + 1).padStart(2, '0')}-01T00:00:00.000Z`
    );

    const where = {
        date: {
            gte: startOfMonth,
            lt: startofNextMonth,
        },
    };

    const depositsTotal = Number(
        (
            await prisma.transaction.aggregate({
                where: {
                    ...where,
                    type: 'DEPOSIT',
                },
                _sum: {
                    amount: true,
                },
            })
        )._sum.amount
    );

    const investmentsTotal = Number(
        (
            await prisma.transaction.aggregate({
                where: {
                    ...where,
                    type: 'INVESTMENT',
                },
                _sum: {
                    amount: true,
                },
            })
        )._sum.amount
    );

    const expensesTotal = Number(
        (
            await prisma.transaction.aggregate({
                where: {
                    ...where,
                    type: 'EXPENSE',
                },
                _sum: {
                    amount: true,
                },
            })
        )._sum.amount
    );

    const balance = depositsTotal - investmentsTotal - expensesTotal;

    const transactionsTotal = Number(
        (
            await prisma.transaction.aggregate({
                where: {
                    ...where,
                },
                _sum: {
                    amount: true,
                },
            })
        )._sum.amount
    );

    const typePercent = {
        [TransactionType.DEPOSIT]: Math.round(
            (Number(depositsTotal) / Number(transactionsTotal)) * 100
        ),
        [TransactionType.EXPENSE]: Math.round(
            (Number(expensesTotal) / Number(transactionsTotal)) * 100
        ),
        [TransactionType.INVESTMENT]: Math.round(
            (Number(investmentsTotal) / Number(transactionsTotal)) * 100
        ),
    };

    const totalExpensesPerCategory = (
        await prisma.transaction.groupBy({
            by: ['category'],
            where: {
                ...where,
                type: TransactionType.EXPENSE
            },
            _sum: {
                amount: true
            }
        })).map((category) => ({
            category: category.category,
            totalAmount: Number(category._sum.amount),
            percentTotal: Math.round(
                (Number(category._sum.amount) / Number(expensesTotal)) * 100
            )
        }))

        return {
            depositsTotal,
            investmentsTotal,
            expensesTotal,
            balance,
            transactionsTotal,
            typePercent,
            totalExpensesPerCategory
        }
};
