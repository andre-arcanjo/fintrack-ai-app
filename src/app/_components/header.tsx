import Image from "next/image"
import Avatar from '../../assets/avatar.png'
import { auth } from "@/src/lib/auth"
import { headers } from "next/headers"

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const user = session?.user
  const userName = user?.name.split(" ")[0]
  
  return (
    <header className="h-20 flex items-center justify-between px-8 bg-background-dark-header border-b sticky top-0 border-[#1D293D]">
      <div>
        <h2 className="text-lg font-semibold">
          Bem-vindo de volta! {userName} 👋
        </h2>
        <p className="text-xs text-slate-500">
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "2-digit",
            month: "long"
          })}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full overflow-hidden border">
          <Image
            src={Avatar}
            alt="Avatar"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      </div>
    </header>
  )
}