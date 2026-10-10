'use client';

import { useState } from 'react';
import Image from 'next/image';
import deleteIcon from '../../assets/delete-icon.png';
import { deleteTransaction } from '../_actions/manage-transaction';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

export function DeleteTransactionButton({ id, name }: { id: string; name: string }) {
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState('');

    async function handleDelete() {
        if (pending) return;
        setPending(true);
        setError('');
        try {
            const result = await deleteTransaction(id);
            if (result.error) {
                setError(result.error);
                return;
            }
            setOpen(false);
        } catch {
            setError('Não foi possível excluir a transação. Tente novamente.');
        } finally {
            setPending(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={(nextOpen) => {
            if (pending) return;
            setError('');
            setOpen(nextOpen);
        }}>
            <DialogTrigger asChild>
                <button type="button" aria-label={`Excluir transação ${name}`} className="cursor-pointer">
                    <Image src={deleteIcon} alt="" />
                </button>
            </DialogTrigger>
            <DialogContent className="bg-card-dark text-white">
                <DialogHeader>
                    <DialogTitle>Excluir transação</DialogTitle>
                    <DialogDescription>
                        Deseja excluir “{name}”? Esta ação não pode ser desfeita.
                    </DialogDescription>
                </DialogHeader>
                {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
                <DialogFooter className="border-none bg-card-dark">
                    <button type="button" disabled={pending} onClick={() => setOpen(false)} className="rounded-lg border border-[#CAD5E2] px-4 py-2 cursor-pointer disabled:opacity-50">
                        Cancelar
                    </button>
                    <button type="button" disabled={pending} onClick={handleDelete} className="rounded-lg bg-red-600 px-4 py-2 cursor-pointer disabled:opacity-50">
                        {pending ? 'Excluindo...' : 'Excluir transação'}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
