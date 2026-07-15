export type AuthSession = {
  accessToken: string
  refreshToken: string
  profile: {
    id: string
    name: string
    phone: string
    document?: string
  }
}

const AUTH_SESSION_KEY = 'pedeaqui.auth-session'

const canUseSessionStorage = () => typeof window !== 'undefined' && Boolean(window.sessionStorage)

export const saveAuthSession = (session: AuthSession) => {
  if (!canUseSessionStorage()) {
    return
  }

  window.sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session))
}

export const getAuthSession = (): AuthSession | null => {
  if (!canUseSessionStorage()) {
    return null
  }

  const storedSession = window.sessionStorage.getItem(AUTH_SESSION_KEY)

  if (!storedSession) {
    return null
  }

  try {
    const session = JSON.parse(storedSession) as AuthSession

    if (!session.accessToken || !session.profile?.id) {
      return null
    }

    return session
  } catch {
    window.sessionStorage.removeItem(AUTH_SESSION_KEY)
    return null
  }
}

export const clearAuthSession = () => {
  if (canUseSessionStorage()) {
    window.sessionStorage.removeItem(AUTH_SESSION_KEY)
  }
}
