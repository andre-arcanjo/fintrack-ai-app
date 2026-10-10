"use client"

import { useRouter } from "next/navigation"

export function MonthSelect({ month }: { month: string }) {
  const router = useRouter()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.push(`?month=${e.target.value}`)
  }

  return (
    <select
      aria-label="Selecionar mês"
      value={month}
      onChange={handleChange}
      className="cursor-pointer rounded-lg border border-[#334155] bg-[#1e293b] px-3 py-2 text-sm text-slate-100 outline-none transition-colors hover:border-[#9333EA] focus-visible:border-[#9333EA] focus-visible:ring-2 focus-visible:ring-[#9333EA]/40 [color-scheme:dark] [&>option]:bg-[#1e293b] [&>option]:text-slate-100"
    >
      <option value="01">Janeiro</option>
      <option value="02">Fevereiro</option>
      <option value="03">Março</option>
      <option value="04">Abril</option>
      <option value="05">Maio</option>
      <option value="06">Junho</option>
      <option value="07">Julho</option>
      <option value="08">Agosto</option>
      <option value="09">Setembro</option>
      <option value="10">Outubro</option>
      <option value="11">Novembro</option>
      <option value="12">Dezembro</option>
    </select>
  )
}
