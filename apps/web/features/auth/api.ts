import { API_ROUTES } from '@/constants'
import { apiClient } from '@/lib/api/client'
import type { AuthTokens, SignupRequest } from '@/types/auth'

/**
 * 인증 관련 API 모음
 */
export async function signup(data: SignupRequest) {
  return apiClient.post<AuthTokens>(API_ROUTES.AUTH.SIGNUP, data)
}
