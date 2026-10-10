'use client';

import Image from 'next/image';
import insightsIcon from '../../assets/insights-icon.png';
import starIcon from '../../assets/stars-icon.png';
import bulbIcon from '../../assets/bulb-icon.png';
import refreshIcon from '../../assets/refresh-icon.png';
import { TransactionCategory } from '@/src/generated/prisma/enums';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface CategorySummary {
    category: TransactionCategory;
    totalAmount: number;
    percentOfTotal: number;
}

interface AiInsightsProps {
    month: string;
    year: number;
    depositsTotal: number;
    expensesTotal: number;
    investmentsTotal: number;
    balance: number;
    totalExpensePerCategory: CategorySummary[];
}

interface AiResponse {
    suggestion: string;
    topCategory: string | null;
    topCategoryAmount: string | null;
}

export const AiInsights = ({
    year,
    month,
    balance,
    depositsTotal,
    expensesTotal,
    investmentsTotal,
    totalExpensePerCategory,
}: AiInsightsProps) => {
    const hasTransactions = depositsTotal > 0 || expensesTotal > 0 || investmentsTotal > 0;
    const activeRequest = useRef<AbortController | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [suggestion, setSuggestion] = useState<string | null>(null);
    const [topCategory, setTopCategory] = useState<string | null>(null);
    const [topCategoryAmount, setTopCategoryAmount] = useState<string | null>(
        null
    );

    const fetchInsights = useCallback(async () => {
        activeRequest.current?.abort();
        if (!hasTransactions) {
            setLoading(false);
            setError(null);
            setSuggestion(null);
            setTopCategory(null);
            setTopCategoryAmount(null);
            return;
        }
        const controller = new AbortController();
        activeRequest.current = controller;
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/ai-insights', {
                method: 'POST',
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    month,
                    year,
                    depositsTotal,
                    expensesTotal,
                    investmentsTotal,
                    balance,
                    totalExpensePerCategory,
                }),
            });

            const data = await response.json();
            if (controller.signal.aborted) return;

            if (!response.ok) {
                setError(data.error ?? 'Erro ao carregar análise.');
                return;
            }

            setSuggestion((data as AiResponse).suggestion ?? null);
            setTopCategory((data as AiResponse).topCategory ?? null);
            setTopCategoryAmount(
                (data as AiResponse).topCategoryAmount ?? null
            );
        } catch {
            if (!controller.signal.aborted) {
                setError('Erro ao conectar. Tente novamente');
            }
        } finally {
            if (!controller.signal.aborted) {
                setLoading(false);
            }
        }
    }, [month, year, depositsTotal, expensesTotal, investmentsTotal, balance, totalExpensePerCategory, hasTransactions]);

    useEffect(() => {
        fetchInsights();
        return () => activeRequest.current?.abort();
    }, [fetchInsights]);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <Image src={starIcon} alt="Star icon" />
                <h3 className="text-xl font-bold">Insights com IA</h3>
            </div>

            {!hasTransactions ? (
                <div className="bg-[#161b26] p-6 rounded-2xl border border-[#1d293d] text-center text-slate-400 text-sm">
                    Adicione transações no mês para receber sugestões da IA.
                </div>
            ) : loading ? (
                <div className="bg-[#161b26] p-8 rounded-2xl border border-[#1d293d] flex flex-col items-center justify-center gap-4 min-h-50">
                    <Loader2
                        className="h-10 w-10 animate-spin text-violet-500"
                        aria-hidden
                    />
                    <p className="text-sm text-slate-400">
                        Analisando seus dados do mês…
                    </p>
                </div>
            ) : error ? (
                <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl">
                    <p className="text-sm text-red-400">{error}</p>
                    <button
                        type="button"
                        onClick={fetchInsights}
                        className="mt-3 text-sm font-medium text-violet-400 hover:text-violet-300"
                    >
                        Tentar novamente
                    </button>
                </div>
            ) : (
                <>
                    {topCategory && topCategoryAmount && (
                        <div className="bg-[#161b26] p-6 rounded-2xl border border-[#1d293d] flex gap-4">
                            <div className="bg-purple-100 dark:bg-purple-500/20 text-primary p-3 rounded-xl h-fit">
                                <Image src={insightsIcon} alt="Insights Icon" />
                            </div>
                            <div>
                                <p className="text-slate-400 text-sm">
                                    Categoria com maior gasto
                                </p>
                                <p className="font-semibold">
                                    {topCategory}:{' '}
                                    <span className="text-[#9333EA]">
                                        {topCategoryAmount}
                                    </span>
                                </p>
                            </div>
                        </div>
                    )}

                    {suggestion && (
                        <div className="bg-emerald-500/5 border-emerald-500/20 p-6 rounded-2xl border flex gap-4">
                            <div className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-3 rounded-xl h-fit shrink-0">
                                <Image src={bulbIcon} alt="Bulb Icon" />
                            </div>
                            <div className="min-w-0">
                                <p className="font-medium text-emerald-400 mb-2">
                                    Sugestão de economia
                                </p>
                                <div className="text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                                    {suggestion}
                                </div>
                            </div>
                        </div>
                    )}

                    {!suggestion && !topCategory && !loading && !error && (
                        <div className="bg-[#161b26] p-6 rounded-2xl border border-[#1d293d] text-center text-slate-400 text-sm">
                            Adicione transações no mês para receber sugestões da
                            IA.
                        </div>
                    )}
                </>
            )}

            <button
                className="flex items-center justify-center gap-3 w-full border-2 border-dashed border-card-dark py-4 rounded-2xl hover:border-[#9333EA] hover:text-[#9333EA] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!hasTransactions}
                onClick={fetchInsights}
            >
                <Image src={refreshIcon} alt="Refresh icon" />
                <span>Atualizar análise</span>
            </button>
        </div>
    );
};
