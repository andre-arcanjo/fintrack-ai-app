import { TransactionType } from '@/src/generated/prisma/enums';
import { prisma } from '@/src/lib/prisma';
import { auth } from '@/src/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export const getDashboard = async (month: string, year: number) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const userId = session?.user.id;

    if (!userId) {
        redirect('sign-in');
    }

    const startOfMonth = new Date(`${year}-${month}-01T00:00:00.000Z`);

    const startofNextMonth = new Date(
        month === '12'
            ? `${year + 1}-01-01T00:00:00.000Z`
            : `${year}-${String(Number(month) + 1).padStart(2, '0')}-01T00:00:00.000Z`
    );

    const where = {
        userId,
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

    const previousMonthTotals = await prisma.transaction.groupBy({
        by: ['type'],
        where: {
            userId,
            date: {
                gte: new Date(Date.UTC(year, Number(month) - 2, 1)),
                lt: startOfMonth,
            },
            type: { in: [TransactionType.DEPOSIT, TransactionType.EXPENSE] },
        },
        _sum: { amount: true },
    });

    const savings = depositsTotal - expensesTotal;
    const previousSavings = previousMonthTotals.length === 0
        ? null
        : previousMonthTotals.reduce((total, transaction) => {
            const amount = Number(transaction._sum.amount);
            return total + (transaction.type === TransactionType.DEPOSIT ? amount : -amount);
        }, 0);

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
                type: TransactionType.EXPENSE,
            },
            _sum: {
                amount: true,
            },
        })
    ).map((category) => ({
        category: category.category,
        totalAmount: Number(category._sum.amount),
        percentTotal: Math.round(
            (Number(category._sum.amount) / Number(expensesTotal)) * 100
        ),
    }));

    return {
        savings,
        previousSavings,
        depositsTotal,
        investmentsTotal,
        expensesTotal,
        balance,
        transactionsTotal,
        typePercent,
        totalExpensesPerCategory,
        session,
    };
};
