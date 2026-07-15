import { AuthHeader } from '../../../../shared/components/AuthHeader'
import type { AppRoute } from '../../../../app/routes/types'

type ForgotPasswordHeaderProps = {
  onNavigate: (route: AppRoute, planId?: number) => void
}

export function ForgotPasswordHeader({ onNavigate }: ForgotPasswordHeaderProps) {
  return <AuthHeader onNavigate={onNavigate} />
}
