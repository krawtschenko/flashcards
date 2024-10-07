export type Login = {
  email: string
  password: string
  rememberMe?: boolean
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
}

export type Me = {
  avatar: string
  created: Date
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: Date
}

export type Registration = {
  email: string
  password: string
}

export type RegistrationResponse = {
  email: string
  id: string
  name: string
}

export type UpdateUser = {
  avatar?: File | null
  name?: string
}

export type resetPassBody = {
  password: string
  token: string
}
