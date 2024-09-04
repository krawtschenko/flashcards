export type LoginBody = {
  email: string
  password: string
  rememberMe?: boolean
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
}

export type MeResponse = {
  avatar: string
  created: Date
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: Date
}
