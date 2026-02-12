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

export async function logout() {
  return apiClient.post<{ success: boolean; message: string }>(API_ROUTES.AUTH.LOGOUT)
}

export async function deleteMe() {
  return apiClient.delete<{ success: boolean; message: string }>(API_ROUTES.AUTH.DELETE_ME)
}

/**
 * accessToken 재발급 (refreshToken 쿠키 기반)
 * 보통은 apiClient가 401에서 자동으로 호출하지만, 필요 시 수동 호출용으로 제공합니다.
 */
export async function refreshAccessToken() {
  return apiClient.post<{ success: true; message: string }>(API_ROUTES.AUTH.REFRESH)
}
