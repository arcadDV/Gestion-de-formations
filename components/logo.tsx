import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export function Logo({
  className,
  variant = "default",
}: {
  className?: string
  variant?: "default" | "light"
}) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)} aria-label="Accueil Netzone Service">
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
        <ShieldCheck className="size-5" strokeWidth={2.2} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-[15px] font-extrabold tracking-tight",
            variant === "light" ? "text-white" : "text-foreground",
          )}
        >
          NETZONE <span className="text-primary">& SERVICES</span>
        </span>
        <span
          className={cn(
            "mt-0.5 text-[9px] font-medium uppercase tracking-[0.15em]",
            variant === "light" ? "text-white/60" : "text-muted-foreground",
          )}
        >
          Conseil · Formation · Digital
        </span>
      </span>
    </Link>
  )
}
