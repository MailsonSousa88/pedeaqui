export type LoginFormValues = {
  email: string
  password: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
  profile: {
    id: string
    name: string
    phone: string
    document?: string
  }
}
