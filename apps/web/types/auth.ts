export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  email: string
  nickname: string
  password: string
  confirmPassword: string
}

export interface SignupRequest {
  email: string
  nickname: string
  password: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}
