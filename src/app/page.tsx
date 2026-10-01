import { Sidebar } from '../app/_components/sidebar';
import BalanceCard from './_components/balance-card';
import Header from './_components/header';
import ChartCard from './_components/chart-card';
import { FinancialMetricCard } from './_components/financial-metric-card';
import { AiInsights } from './_components/ai-insights';
import { RecentTransactions } from './_components/recent-transactions';
import { getDashboard } from './_data/get-dashboard';
import dayjs from 'dayjs';

interface DashBoardPageProps {
    searchParams: {
        month: string
    }
}

export default async function Home({ searchParams }: DashBoardPageProps) {

    const month = searchParams.month ?? dayjs().format('MM')
    const data = await getDashboard(month)    

    return (
        <div className="flex min-h-screen bg-background-dark">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <Header />
                <main className="p-8 space-y-8">
                    <section className="grid lg:grid-cols-3 grid-cols-1 gap-6">
                        <div className="lg:col-span-2 col-span-1">
                            <BalanceCard balance={data.balance} depositsTotal={data.depositsTotal} expensesTotal={data.expensesTotal} />
                        </div>
                        <FinancialMetricCard />
                    </section>

                    <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="flex-1">
                            <ChartCard
                                depositsTotal={data.depositsTotal}
                                expensesTotal={data.expensesTotal}
                                investmentsTotal={data.investmentsTotal}
                                balance={data.balance}
                            />
                        </div>
                        <div className="flex-1">
                            <AiInsights />
                        </div>
                    </section>
                    <section>
                        <RecentTransactions />
                    </section>
                </main>
            </div>
        </div>
    );
}
