import { API_CONFIG } from '@/constants'
import type { ApiResponse } from '@/types'

/**
 * API 클라이언트 설정
 */
class ApiClient {
  private baseURL: string
  private timeout: number

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL
    this.timeout = API_CONFIG.TIMEOUT
  }

  /**
   * 기본 fetch 래퍼
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
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

      if (!response.ok) {
        const error = await response.json()
        return {
          success: false,
          error: error.message || 'API 요청 실패',
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
        if (error.name === 'AbortError') {
          return {
            success: false,
            error: '요청 시간이 초과되었습니다.',
          }
        }
        return {
          success: false,
          error: error.message,
        }
      }

      return {
        success: false,
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
   * PUT 요청
   */
  async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
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
