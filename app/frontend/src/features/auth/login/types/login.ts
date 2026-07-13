export type LoginFormValues = {
  email: string
  password: string
}

export type LoginPayload = {
  email: string
  password: string
}

import type { AuthSession } from '../../../../shared/services/authSession'

export type LoginResponse = AuthSession

export type LoginResolvedStore = {
  id: string
  tenantId: string
  slug: string
  storeName: string
  active: boolean
}

export type LoginSubmissionStage = 'idle' | 'authenticating' | 'resolving-store'
