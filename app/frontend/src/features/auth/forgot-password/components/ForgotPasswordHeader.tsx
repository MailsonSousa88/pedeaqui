import Header from '../../../../shared/components/Header'
import type { AppRoute } from '../../../../app/routes/types'

type ForgotPasswordHeaderProps = {
  onNavigate: (route: AppRoute, planId?: number) => void
}

export function ForgotPasswordHeader({ onNavigate }: ForgotPasswordHeaderProps) {
  return (
    <Header
      currentPath="/forgot-password"
      onNavigate={onNavigate}
      minimal={true}
    />
  )
}
