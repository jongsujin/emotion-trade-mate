import { API_ROUTES } from '@/constants'
import { apiClient } from '@/lib/api/client'
import type { AuthTokens, LoginFormData, SignupRequest } from '@/types/auth'

/**
 * 인증 관련 API 모음
 */
export async function signup(data: SignupRequest) {
  return apiClient.post(API_ROUTES.AUTH.SIGNUP, data)
}

export async function login(data: LoginFormData) {
  return apiClient.post<AuthTokens>(API_ROUTES.AUTH.LOGIN, data)
}
