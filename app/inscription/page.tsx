import { AuthShell } from "@/components/auth/auth-shell"
import { RegisterForm } from "@/components/auth/register-form"

export default function InscriptionPage() {
  return (
    <AuthShell
      title="Créer un compte"
      subtitle="Rejoignez Netzone Service au Gabon et commencez votre formation."
    >
      <RegisterForm />
    </AuthShell>
  )
}
