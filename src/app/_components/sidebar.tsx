'use client';

import Link from 'next/link';
import Image from 'next/image';
import dashboardIcon from '../../assets/dashboard-icon.png';
import transactionIcon from '../../assets/transaction-icon.png';
import logo from '../../assets/sidebar.png';
import { Logout } from './logout';
import { usePathname } from 'next/navigation';

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
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl ${pathname === '/' ? 'bg-[#9333EA]' : ''}`}
                >
                    <Image src={dashboardIcon} alt="Dashboard" />
                    Dashboard
                </Link>

                <Link
                    href={'/transactions'}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl ${pathname === '/transactions' ? 'bg-[#9333EA]' : ''}`}
                >
                    <Image src={transactionIcon} alt="Relatórios" />
                    Transações
                </Link>
            </nav>

            <div className="border-t border-[#1D293D] px-6 py-6">
                <Logout />
            </div>
        </aside>
    );
};
