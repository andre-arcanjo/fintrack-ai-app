import { DonutChart } from './donut-chart';
import { MonthSelect } from './month-select';

interface ChartCardProps {
    depositsTotal: number;
    expensesTotal: number;
    investmentsTotal: number;
    balance: number;
}

export default function ChartCard({
    depositsTotal,
    expensesTotal,
    investmentsTotal,
    balance,
}: ChartCardProps) {
    return (
        <div className="bg-[#161b26] py-9 px-8 rounded-3xl">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold mb-6">Gráficos</h3>
                <MonthSelect />
            </div>
            <div>
                <DonutChart
                    depositsTotal={depositsTotal}
                    expensesTotal={expensesTotal}
                    investmentsTotal={investmentsTotal}
                    balance={balance}
                />
            </div>
        </div>
    );
}
