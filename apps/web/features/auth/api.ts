import { API_ROUTES } from '@/constants'
import { apiClient } from '@/lib/api/client'
import { UserInfo, type AuthTokens, type LoginFormData, type SignupRequest } from '@/types/auth'

/**
 * 인증 관련 API 모음
 */
export async function signup(data: SignupRequest) {
  return apiClient.post(API_ROUTES.AUTH.SIGNUP, data)
}

export async function login(data: LoginFormData) {
  return apiClient.post<AuthTokens>(API_ROUTES.AUTH.LOGIN, data)
}

export async function getMe() {
  return apiClient.get<UserInfo>(API_ROUTES.AUTH.ME)
}
