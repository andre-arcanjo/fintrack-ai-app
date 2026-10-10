import { TransactionIcon } from './transaction-icon';
import { AddTransactionButton } from './add-transaction';
import Link from 'next/link';
import { getRecentTransactions } from '../_data/get-recent-transactions';

export const RecentTransactions = async () => {
    
    const recentTransactions = await getRecentTransactions()

    return (
        <div>
            <div className="flex justify-between mb-5 items-center">
                <p className="text-xl font-bold">Transações recentes</p>
                <AddTransactionButton />
            </div>

            <div className="bg-[#161b26] rounded-3xl border border-[#1d293d] overflow-hidden">
                {recentTransactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="p-5 flex gap-4 border-b last:border-none border-[#1d293d] hover:bg-slate-800/50 transition-colors"
                    >
                        <TransactionIcon type={transaction.type} />

                        <div className="flex-1">
                            <p>{transaction.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {transaction.date.toLocaleDateString('pt-BR', {
                                    timeZone: 'UTC',
                                    day: '2-digit',
                                    month: 'long',
                                })}{' '}
                                • {transaction.category}
                            </p>
                        </div>

                        <span
                            className={
                                transaction.type === 'EXPENSE'
                                    ? 'text-rose-500'
                                    : transaction.type === 'INVESTMENT'
                                        ? 'text-blue-500'
                                        : 'text-emerald-500'
                            }
                        >
                            {transaction.type === 'DEPOSIT' ? '+' : '-'}
                            {Number(transaction.amount).toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            })}
                        </span>
                    </div>
                ))}
                <div className="p-4 bg-slate-800/20 text-center">
                    <Link
                        className="text-sm hover:underline"
                        href="/transactions"
                    >
                        Ver todo o histórico
                    </Link>
                </div>
            </div>
        </div>
    );
};
