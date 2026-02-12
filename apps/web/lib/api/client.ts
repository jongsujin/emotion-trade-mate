import { API_CONFIG, API_ROUTES } from '@/constants'
import type { ApiResponse } from '@/types'

/**
 * API 클라이언트 설정
 */
class ApiClient {
  private baseURL: string
  private timeout: number
  private refreshPromise: Promise<boolean> | null

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL
    this.timeout = API_CONFIG.TIMEOUT
    this.refreshPromise = null
  }

  private isRefreshEndpoint(endpoint: string) {
    return endpoint === API_ROUTES.AUTH.REFRESH
  }

  private async refreshAccessToken(): Promise<boolean> {
    // 동시에 여러 401이 나와도 refresh는 1번만 수행
    if (this.refreshPromise) return this.refreshPromise

    this.refreshPromise = (async () => {
      try {
        const response = await fetch(`${this.baseURL}${API_ROUTES.AUTH.REFRESH}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
        return response.ok
      } catch {
        return false
      } finally {
        this.refreshPromise = null
      }
    })()

    return this.refreshPromise
  }

  /**
   * 기본 fetch 래퍼
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retryState: { hasRetried: boolean } = { hasRetried: false }
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        credentials: 'include', // httpOnly 쿠키 전송
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // accessToken 만료 → refresh 후 1회 재시도
      if (
        response.status === 401 &&
        !retryState.hasRetried &&
        !this.isRefreshEndpoint(endpoint) &&
        endpoint !== API_ROUTES.AUTH.LOGIN &&
        endpoint !== API_ROUTES.AUTH.SIGNUP
      ) {
        const refreshed = await this.refreshAccessToken()
        if (refreshed) {
          return this.request<T>(endpoint, options, { hasRetried: true })
        }
      }

      if (!response.ok) {
        let error: { message?: string } | null = null
        try {
          const parsed = await response.json()
          if (typeof parsed === 'object' && parsed !== null) {
            error = parsed as { message?: string }
          }
        } catch {
          // ignore
        }
        return {
          success: false,
          status: response.status,
          error: error?.message || 'API 요청 실패',
        }
      }

      const data = await response.json()
      return {
        success: true,
        data,
        status: response.status,
      }
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return {
            success: false,
            status: 408,
            error: '요청 시간이 초과되었습니다.',
          }
        }
        return {
          success: false,
          status: undefined,
          error: error.message,
        }
      }

      return {
        success: false,
        status: undefined,
        error: '알 수 없는 오류가 발생했습니다.',
      }
    }
  }

  /**
   * GET 요청
   */
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint

    return this.request<T>(url, {
      method: 'GET',
    })
  }

  /**
   * POST 요청
   */
  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * PATCH 요청
   */
  async patch<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * DELETE 요청
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    })
  }

  /**
   * 파일 업로드
   */
  async upload<T>(endpoint: string, file: File): Promise<ApiResponse<T>> {
    const formData = new FormData()
    formData.append('file', file)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const error = await response.json()
        return {
          success: false,
          error: error.message || '파일 업로드 실패',
        }
      }

      const data = await response.json()
      return {
        success: true,
        data,
      }
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof Error) {
        return {
          success: false,
          error: error.message,
        }
      }

      return {
        success: false,
        error: '파일 업로드 중 오류가 발생했습니다.',
      }
    }
  }
}

/**
 * API 클라이언트 인스턴스
 */
export const apiClient = new ApiClient()
