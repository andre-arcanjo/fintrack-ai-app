import Image from 'next/image';
import PigIcon from '../../assets/pig-icon.png';

interface FinancialMetricCardProps {
    savings: number;
    previousSavings: number | null;
}

const formatCurrency = (value: number) => value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

export const FinancialMetricCard = ({ savings, previousSavings }: FinancialMetricCardProps) => {
    const difference = previousSavings === null
        ? null
        : Math.round((savings - previousSavings) * 100) / 100;
    const comparison = difference === null
        ? 'Sem entradas ou despesas no mês anterior para comparar.'
        : difference === 0
            ? 'Mesmo resultado do mês anterior.'
            : `${formatCurrency(Math.abs(difference))} a ${difference > 0 ? 'mais' : 'menos'} que no mês anterior.`;

    return (
        <div className='flex flex-col items-center justify-center bg-[#161B26] rounded-2xl py-6 px-4'>
            <div className='mb-4 py-5 px-4 bg-[#10B983]/20 rounded-full'>
                <Image src={PigIcon} alt="Pig Icon" />
            </div>
            <h4 className='text-lg font-bold mb-2'>Economia do mês</h4>
            <p className={`text-3xl font-bold mb-2 ${savings < 0 ? 'text-rose-500' : 'text-[#10b981]'}`}>
                {formatCurrency(savings)}
            </p>
            <p className='text-center text-xs text-border-aside'>{comparison}</p>
        </div>
    );
};
