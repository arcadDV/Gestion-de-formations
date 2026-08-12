"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { LayoutDashboard, LogOut, Menu, User as UserIcon } from "lucide-react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/lib/auth-context"

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/formations", label: "Formations" },
  { href: "/#pourquoi", label: "Pourquoi nous" },
  { href: "/#contact", label: "Contact" },
]

export function SiteNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  const dashboardHref = user?.role === "admin" ? "/admin" : "/dashboard"

  async function handleLogout() {
    await logout()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hidden gap-2 md:inline-flex">
                  <Avatar className="size-7">
                    <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="max-w-28 truncate text-sm font-medium">{user.firstName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col">
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push(dashboardHref)}>
                  <LayoutDashboard className="mr-2 size-4" />
                  Tableau de bord
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/dashboard/profil")}>
                  <UserIcon className="mr-2 size-4" />
                  Mon profil
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 size-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" asChild>
                <Link href="/connexion">Connexion</Link>
              </Button>
              <Button asChild>
                <Link href="/inscription">Inscription</Link>
              </Button>
            </div>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Ouvrir le menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1 px-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-4 flex flex-col gap-2 border-t border-border px-4 pt-4">
                {user ? (
                  <>
                    <Button asChild onClick={() => setOpen(false)}>
                      <Link href={dashboardHref}>Tableau de bord</Link>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setOpen(false)
                        handleLogout()
                      }}
                    >
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild onClick={() => setOpen(false)}>
                      <Link href="/inscription">Inscription</Link>
                    </Button>
                    <Button variant="outline" asChild onClick={() => setOpen(false)}>
                      <Link href="/connexion">Connexion</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
