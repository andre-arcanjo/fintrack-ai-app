'use client'

import { authClient } from '@/src/lib/auth-client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logoutIcon from '../../assets/logout-icon.png';

export const Logout = () => {

    const router = useRouter()

    async function handleLogout() {
        await authClient.signOut()
        router.push('sign-in')
    }

    return (
        <button
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-text-secondary cursor-pointer" onClick={handleLogout}
                >
                    <Image src={logoutIcon} alt="Logout" />
                    <span className="text-base font-medium leading-normal text-center">
                        Sair
                    </span>
                </button>
    )
}