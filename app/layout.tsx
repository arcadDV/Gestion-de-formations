import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import { Suspense } from "react"
import { AuthProvider } from "@/lib/auth-context"
import { DataProvider } from "@/lib/data-context"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Netzone Service — Formations professionnelles en informatique au Gabon",
  description:
    "Développez vos compétences numériques avec Netzone Service au Gabon. Formations en développement web, mobile, cybersécurité, IA, marketing digital et plus encore.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a2033" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable} bg-background`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>
          <AuthProvider>
            <DataProvider>{children}</DataProvider>
          </AuthProvider>
        </Suspense>
        <Toaster position="top-center" richColors />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
