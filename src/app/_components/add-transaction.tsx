'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '../_components/ui/dialog';

import { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select';
import Image from 'next/image';
import ConfirmIcon from '../../assets/confirm-icon.png'

export const AddTransactionButton = () => {
    const [open, setIsOpen] = useState<boolean>(false);

    return (
        <section>
            <Dialog open={open} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <button
                        type="button"
                        className="rounded-sm bg-[#9333EA] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transaction-colors flex items-center gap-2 cursor-pointer"
                    >
                        <p>+ Adicionar</p>
                    </button>
                </DialogTrigger>

                <DialogContent className='bg-card-dark text-white'>
                    <DialogHeader className='p-2'>
                        <DialogTitle>Nova transação</DialogTitle>
                    </DialogHeader>

                    <form className='flex flex-col gap-4 pt-4'>
                        <div className='space-y-2'>
                            <Label>Título</Label>
                            <Input
                                id="name"
                                placeholder="Ex: Almoço, Freela..."
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label>Valor (R$)</Label>
                            <Input
                                id="amount" type='number' 
                                placeholder="0,00"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label>Tipo</Label>
                            <Select>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>

                                <SelectContent>

                                </SelectContent>
                            </Select>
                        </div>
                        <div className='space-y-2'>
                            <Label>Categoria</Label>
                            <Select>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>

                                <SelectContent>
                                    
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='space-y-2'>
                            <Label>Método de pagamento</Label>
                            <Select>
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>

                                <SelectContent>
                                    
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='space-y-2'>
                            <Label>Data</Label>
                            <Input
                                id="date"
                                placeholder="__/__/____"
                            />
                        </div>

                        <DialogFooter className='gap-4 border-none bg-card-dark'>
                            <button className='border border-[#CAD5E2] rounded-lg w-1/3 py-2.5 cursor-pointer'>Cancelar</button>
                            <button className='bg-[#8E51FF] w-2/3 flex items-center justify-center gap-2 rounded-xl cursor-pointer'>
                                <Image src={ConfirmIcon} alt='Confirm Icon' />
                                <p className='font-semibold text-sm'>Salvar transação</p>
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
};
