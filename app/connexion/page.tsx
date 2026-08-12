import { AuthShell } from "@/components/auth/auth-shell"
import { LoginForm } from "@/components/auth/login-form"

export default function ConnexionPage() {
  return (
    <AuthShell
      title="Connexion"
      subtitle="Accédez à votre espace apprenant ou administrateur."
    >
      <LoginForm />
    </AuthShell>
  )
}
