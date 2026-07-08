export type RegisterFormValues = {
  fullName: string
  email: string
  phone: string
  password: string
  document: string
}

export type RegisterPayload = {
  email: string
  password: string
  name: string
  phone: string
  document: string
}

export type RegisterResponse = {
  message: string
  profile: {
    id: string
    name: string
    phone: string
    document?: string
    createdAt?: string
    updatedAt?: string
  }
}
