'use client'

import { authClient } from '@/src/lib/auth-client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logoutIcon from '../../assets/logout-icon.png';
import { useState } from 'react';

export const Logout = () => {

    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    async function handleLogout() {
        if (isSubmitting) return;
        setIsSubmitting(true);
        setError('');
        try {
            const result = await authClient.signOut();
            if (result.error) {
                setError('Não foi possível sair da conta. Tente novamente.');
                return;
            }
            router.replace('/sign-in');
            router.refresh();
        } catch {
            setError('Não foi possível sair da conta. Verifique sua conexão e tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <button
                    type="button"
                    disabled={isSubmitting}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-text-secondary cursor-pointer disabled:cursor-wait disabled:opacity-50" onClick={handleLogout}
                >
                    <Image src={logoutIcon} alt="Logout" />
                    <span className="text-base font-medium leading-normal text-center">
                        {isSubmitting ? 'Saindo...' : 'Sair'}
                    </span>
                </button>
            {error && <p role="alert" className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
    )
}
