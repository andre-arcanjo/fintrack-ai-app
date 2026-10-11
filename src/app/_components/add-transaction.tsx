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
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from './ui/select';
import Image from 'next/image';
import ConfirmIcon from '../../assets/confirm-icon.png';
import editIcon from '../../assets/edit-icon.png';
import { useForm, Controller } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    TRANSACTION_CATEGORY_OPTIONS,
    TRANSACTION_PAYMENT_METHOD_OPTIONS,
    TRANSACTION_TYPE_OPTIONS,
} from '../_constants/transaction';
import {
    createTransactionFormSchema,
    type CreateTransactionFormData,
} from '../_schemas/transaction';
import { addTransaction } from '../_actions/add-transaction';
import { updateTransaction } from '../_actions/manage-transaction';

export type EditableTransaction = Omit<CreateTransactionFormData, 'date'> & {
    id: string;
    date: string;
};

export const AddTransactionButton = ({ transaction }: { transaction?: EditableTransaction }) => {
    const [open, setIsOpen] = useState<boolean>(false);
    const [apiError, setApiError] = useState('');
    const defaultValues = transaction ? {
        name: transaction.name,
        amount: transaction.amount,
        type: transaction.type,
        category: transaction.category,
        paymentMethod: transaction.paymentMethod,
        date: transaction.date,
    } : { name: '', amount: '', date: '' };

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<z.input<typeof createTransactionFormSchema>, unknown, CreateTransactionFormData>({
        resolver: zodResolver(createTransactionFormSchema),
        defaultValues,
        mode: 'onBlur',
    });

    const onSubmit = async (data: CreateTransactionFormData) => {
        setApiError('');
        try{
        if (transaction) {
            const result = await updateTransaction(transaction.id, data);
            if (result.error) {
                setApiError(result.error);
                return;
            }
        } else {
            await addTransaction(data);
        }
        reset();
        setIsOpen(false);
        }catch {
            setApiError('Não foi possível salvar a transação. Tente novamente.');
        }
    };

    const handleOpenChange = (nextOpen: boolean) => {
        if (isSubmitting) return;
        if (nextOpen) {
            reset(defaultValues);
            setApiError('');
        }
        setIsOpen(nextOpen);
    };

    return (
        <section>
            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>
                    <button
                        type="button"
                        aria-label={transaction ? `Editar transação ${transaction.name}` : undefined}
                        className={transaction ? 'cursor-pointer' : 'rounded-sm bg-[#9333EA] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transaction-colors flex items-center gap-2 cursor-pointer'}
                    >
                        {transaction ? <Image src={editIcon} alt="" /> : <p>+ Adicionar</p>}
                    </button>
                </DialogTrigger>

                <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain bg-card-dark text-white">
                    <DialogHeader className="p-2 pr-8">
                        <DialogTitle>{transaction ? 'Editar transação' : 'Nova transação'}</DialogTitle>
                    </DialogHeader>

                    <form
                        className="flex min-w-0 flex-col gap-4 pt-2 sm:pt-4 [&_[data-slot=input]]:min-h-11 sm:[&_[data-slot=input]]:min-h-8 [&_[data-slot=select-trigger]]:min-h-11 sm:[&_[data-slot=select-trigger]]:min-h-8 [&_[data-slot=select-value]]:min-w-0 [&_[data-slot=select-value]]:flex-1 [&_[data-slot=select-value]]:text-left"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="space-y-2">
                            <Label>Título</Label>
                            <Input
                                id="name"
                                placeholder="Ex: Almoço, Freela..."
                                {...register('name')}
                            />

                            {errors.name && (
                                <p className="text-xs text-red-500">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>Valor (R$)</Label>
                            <Input
                                id="amount"
                                type="number"
                                step="0.01"
                                placeholder="0,00"
                                {...register('amount', { valueAsNumber: true })}
                            />

                            {errors.amount && (
                                <p className="text-xs text-red-500">
                                    {errors.amount.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>Tipo</Label>

                            <Controller
                                control={control}
                                name="type"
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value ?? ''}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione o tipo" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {TRANSACTION_TYPE_OPTIONS.map(
                                                (opt) => (
                                                    <SelectItem
                                                        key={opt.value}
                                                        value={opt.value}
                                                    >
                                                        {opt.label}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.type && (
                                <p className="text-xs text-red-500">
                                    {errors.type.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>Categoria</Label>
                            <Controller
                                control={control}
                                name="category"
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value ?? ''}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione a categoria" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {TRANSACTION_CATEGORY_OPTIONS.map(
                                                (opt) => (
                                                    <SelectItem
                                                        key={opt.value}
                                                        value={opt.value}
                                                    >
                                                        {opt.label}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.category && (
                                <p className="text-xs text-red-500">
                                    {errors.category.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>Método de pagamento</Label>
                            <Controller
                                control={control}
                                name="paymentMethod"
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value ?? ''}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione o método de pagamento" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {TRANSACTION_PAYMENT_METHOD_OPTIONS.map(
                                                (opt) => (
                                                    <SelectItem
                                                        key={opt.value}
                                                        value={opt.value}
                                                    >
                                                        {opt.label}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.paymentMethod && (
                                <p className="text-xs text-red-500">
                                    {errors.paymentMethod.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>Data</Label>
                            <Input
                                id="date"
                                type="date"
                                placeholder="__/__/____"
                                {...register('date')}
                            />
                            {errors.date && (
                                <p className="text-xs text-red-500">
                                    {errors.date.message}
                                </p>
                            )}
                        </div>

                        {apiError && <p role="alert" className="text-sm text-red-500">{apiError}</p>}

                        <DialogFooter className="gap-3 border-none bg-card-dark sm:gap-4">
                            <button
                                type="button"
                                onClick={() => handleOpenChange(false)}
                                disabled={isSubmitting}
                                className="border border-[#CAD5E2] rounded-lg min-h-11 w-full py-2.5 cursor-pointer sm:w-1/3"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="bg-[#8E51FF] min-h-11 w-full py-2.5 flex items-center justify-center gap-2 rounded-xl cursor-pointer sm:w-2/3"
                                disabled={isSubmitting}
                            >
                                <Image src={ConfirmIcon} alt="Confirm Icon" />
                                <p className="font-semibold text-sm">
                                    {isSubmitting
                                        ? 'Salvando...'
                                        : 'Salvar transação'}
                                </p>
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
};
