'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import dashboardIcon from '../../assets/dashboard-icon.png';
import transactionIcon from '../../assets/transaction-icon.png';
import logoutIcon from '../../assets/logout-icon.png';
import logo from '../../assets/sidebar.png';

const navItems = [
    { href: '/', label: 'Dashboard', icon: dashboardIcon },
    { href: '/transactions', label: 'Transações', icon: transactionIcon },
];

export const Sidebar = () => {
    const pathname = usePathname();
    return (
        <aside className="w-64 border-r border-[#1d293d] flex flex-col bg-background-dark-header">
            <div className="p-6 flex items-center gap-3">
                <div className="bg-[#9333EA] p-2 rounded-xl">
                    <Image src={logo} alt="Fintrack" />
                </div>
                <h1 className="text-xl font-bold">FinTrack</h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 bg-[#9333EA] rounded-xl"
                >
                    <Image src={dashboardIcon} alt="Dashboard" />
                    Dashboard
                </Link>

                <div
                    className="flex items-center gap-3 px-4 py-3 text-slate-500 rounded-xl opacity-50 cursor-not-allowed select-none"
                    title="Disponível em uma próxima aula"
                >
                    <Image src={transactionIcon} alt="Relatórios" />
                    Relatórios
                </div>
            </nav>

            <div className="border-t border-[#1D293D] px-6 py-6">
                <a
                    href="#"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-text-secondary"
                >
                    <Image src={logoutIcon} alt="Logout" />
                    <span className="text-base font-medium leading-normal text-center">
                        Sair
                    </span>
                </a>
            </div>
        </aside>
    );
};
