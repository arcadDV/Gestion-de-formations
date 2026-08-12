import type { ReactNode } from "react"
import { Logo } from "@/components/logo"
import { GraduationCap, Award, Users } from "lucide-react"

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-primary lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url(/cta-bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden
        />
        <Logo variant="light" className="relative z-10" />

        <div className="relative z-10 space-y-6 text-primary-foreground">
          <h2 className="font-heading text-3xl font-bold leading-tight text-balance">
            Développez vos compétences numériques avec Netzone &amp; Services
          </h2>
          <p className="max-w-md leading-relaxed text-primary-foreground/80">
            Rejoignez des centaines d&apos;apprenants gabonais formés par nos experts. Conseil, formation et solutions
            digitales pour le marché local.
          </p>
          <ul className="space-y-4 pt-2">
            {[
              { icon: GraduationCap, text: "Formations certifiantes et pratiques" },
              { icon: Award, text: "Formateurs professionnels du secteur" },
              { icon: Users, text: "Suivi personnalisé de votre progression" },
            ].map((item) => (
              <li key={item.text} className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary-foreground/15">
                  <item.icon className="size-5" />
                </span>
                <span className="text-sm text-primary-foreground/90">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} Netzone &amp; Services. Tous droits réservés.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex flex-col justify-center px-6 py-10 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          <Logo className="mb-8 inline-flex lg:hidden" />
          <div className="mb-8 space-y-2">
            <h1 className="font-heading text-2xl font-bold text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
