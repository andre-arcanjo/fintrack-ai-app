import Image from 'next/image';
import AccountsIcon from '../../assets/accounts.png';

interface BalanceCardProps {
    balance: number;
    depositsTotal: number;
    expensesTotal: number;
}

export default function BalanceCard({
    balance,
    depositsTotal,
    expensesTotal,
}: BalanceCardProps) {
    return (
        <div className="lg:col-span-2 bg-[#9333EA] p-8 rounded-3xl text-white min-h-60">
            <div className="flex justify-between">
                <div>
                    <p className="text-sm">Saldo total</p>

                    <h3 className="text-5xl font-bold">
                        {balance.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        })}
                    </h3>
                </div>

                <div className="flex shrink-0 items-center justify-center rounded-2xl bg-white/20 p-3 pb-3.5 pt-3 backdrop-blur-md">
                    <Image src={AccountsIcon} alt="" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/20">
                <div>
                    <p className="text-xs opacity-80">Receitas</p>

                    <p className="text-xl font-semibold">
                        {depositsTotal.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        })}
                    </p>
                </div>

                <div>
                    <p className="text-xs opacity-80">Despesas</p>

                    <p className="text-xl font-semibold">
                        {expensesTotal.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
}
