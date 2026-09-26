import Image from 'next/image';
import insightsIcon from '../../assets/insights-icon.png';
import starIcon from '../../assets/stars-icon.png';
import bulbIcon from '../../assets/bulb-icon.png';
import refreshIcon from '../../assets/refresh-icon.png';

export const AiInsights = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <Image src={starIcon} alt="Star icon" />
                <h3 className="text-xl font-bold">Insights com IA</h3>
            </div>

            <div className="bg-[#161B26] p-6 rounded-2xl flex items-center gap-4">
                <div className="bg-[#A855F7]/20 p-4 rounded-xl">
                    <Image src={insightsIcon} alt="Insights icon" />
                </div>
                <div>
                    <p>Categoria com maior gasto</p>
                    <p className="text-sm text-text-secondary">
                        Alimentação:
                        <span className='text-[#9333EA] ml-1 font-semibold'>R$42,00</span>
                    </p>
                </div>
            </div>

            <div className="bg-[#10B981]/5 p-6 rounded-2xl flex items-center gap-4">
                <div className="bg-[#10B981]/20 p-4 rounded-xl">
                    <Image src={bulbIcon} alt="Bulb icon" />
                </div>

                <div>
                    <p>Sugestão de economia</p>
                    <p className="text-sm text-[#CBD5E1]">
                        Para economizar em alimentação, cozinhe mais em casa.
                        Planeje as refeições e leve marmita.
                    </p>
                </div>
            </div>

            <button className='flex items-center justify-center gap-3 w-full border-2 border-dashed border-card-dark py-4 rounded-2xl hover:border-[#9333EA] hover:text-[#9333EA] cursor-pointer'>
                <Image src={refreshIcon} alt="Refresh icon" />
                <span>Atualizar análise</span>
            </button>
        </div>
    );
};
