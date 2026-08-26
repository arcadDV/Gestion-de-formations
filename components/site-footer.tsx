import Link from "next/link"
import { Mail, MapPin, Phone, Send, Share2, Users } from "lucide-react"
import { Logo } from "@/components/logo"
import { CATEGORIES } from "@/lib/mock-data"

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-white/10 bg-[oklch(0.22_0.03_258)] text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo variant="light" />
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              Centre de conseil et de formation professionnelle en informatique et solutions numériques au Gabon.
            </p>
            <div className="flex gap-2">
              {[Share2, Send, Users].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex size-9 items-center justify-center rounded-md bg-white/10 transition-colors hover:bg-primary"
                  aria-label="Réseau social"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold">Formations</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/formations?categorie=${encodeURIComponent(cat)}`}
                    className="transition-colors hover:text-white"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold">Entreprise</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              <li>
                <Link href="/#pourquoi" className="transition-colors hover:text-white">
                  Pourquoi nous choisir
                </Link>
              </li>
              <li>
                <Link href="/formations" className="transition-colors hover:text-white">
                  Nos formations
                </Link>
              </li>
              <li>
                <Link href="/connexion" className="transition-colors hover:text-white">
                  Espace étudiant
                </Link>
              </li>
              <li>
                <Link href="/inscription" className="transition-colors hover:text-white">
                  Créer un compte
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 shrink-0 text-primary" />
                Libreville, Gabon
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-primary" />
                +241 77 38 19 14
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-primary" />
                contact@netzone.ga
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Netzone Service. Tous droits réservés.</p>
          <p>Conseil · Formation · Solutions digitales au Gabon</p>
        </div>
      </div>
    </footer>
  )
}
