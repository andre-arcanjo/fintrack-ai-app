'use client';

import Link from 'next/link';
import Image from 'next/image';
import dashboardIcon from '../../assets/dashboard-icon.png';
import transactionIcon from '../../assets/transaction-icon.png';
import logo from '../../assets/sidebar.png';
import { Logout } from './logout';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Dialog } from 'radix-ui';
import { Menu, X } from 'lucide-react';

const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => {
    const pathname = usePathname();

    return (
        <>
            <div className="p-6 flex items-center gap-3">
                <div className="bg-[#9333EA] p-2 rounded-xl">
                    <Image src={logo} alt="Fintrack" />
                </div>
                <h1 className="text-xl font-bold">FinTrack</h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                <Link
                    href="/"
                    onClick={onNavigate}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl ${pathname === '/' ? 'bg-[#9333EA]' : ''}`}
                >
                    <Image src={dashboardIcon} alt="Dashboard" />
                    Dashboard
                </Link>

                <Link
                    href={'/transactions'}
                    onClick={onNavigate}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl ${pathname === '/transactions' ? 'bg-[#9333EA]' : ''}`}
                >
                    <Image src={transactionIcon} alt="Relatórios" />
                    Transações
                </Link>
            </nav>

            <div className="border-t border-[#1D293D] px-6 py-6">
                <Logout />
            </div>
        </>
    );
};

export const Sidebar = () => (
    <aside className="hidden w-64 shrink-0 border-r border-[#1d293d] md:flex md:flex-col bg-background-dark-header">
        <SidebarContent />
    </aside>
);

export const MobileSidebar = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const desktop = window.matchMedia('(min-width: 768px)');
        const closeOnDesktop = () => {
            if (desktop.matches) setOpen(false);
        };
        desktop.addEventListener('change', closeOnDesktop);
        return () => desktop.removeEventListener('change', closeOnDesktop);
    }, []);

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button type="button" aria-label="Abrir menu de navegação" className="flex size-11 shrink-0 items-center justify-center rounded-lg hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-purple-500 md:hidden">
                    <Menu className="size-6" aria-hidden="true" />
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60" />
                <Dialog.Content aria-describedby={undefined} className="fixed inset-y-0 left-0 z-50 flex h-dvh w-72 max-w-[85vw] flex-col overflow-y-auto border-r border-[#1d293d] bg-background-dark-header outline-none">
                    <Dialog.Title className="sr-only">Menu de navegação</Dialog.Title>
                    <Dialog.Close asChild>
                        <button type="button" aria-label="Fechar menu de navegação" className="absolute right-2 top-2 flex size-11 items-center justify-center rounded-lg hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-purple-500">
                            <X className="size-5" aria-hidden="true" />
                        </button>
                    </Dialog.Close>
                    <SidebarContent onNavigate={() => setOpen(false)} />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
