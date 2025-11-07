'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/common/Button'
import { LoginFormData } from '@/types/auth'

/**
 * 로그인 폼 컴포넌트
 */
export default function LoginForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // 간단한 유효성 검사
    if (!formData.email || !formData.password) {
      setError('이메일과 비밀번호를 입력해주세요')
      return
    }

    if (!formData.email.includes('@')) {
      setError('올바른 이메일 형식을 입력해주세요')
      return
    }

    setIsLoading(true)

    try {
      // TODO: API 호출
      // const response = await apiClient.post('/auth/login', formData)
      // if (!response.success) {
      //   setError(response.error || '로그인에 실패했습니다')
      //   return
      // }

      console.log('Login:', formData)
      // 임시: 성공 시 홈으로 이동
      router.push('/')
    } catch (err) {
      setError(`로그인 중 오류가 발생했습니다: ${err}`)
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = formData.email && formData.password

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 에러 메시지 */}
      {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}

      {/* 이메일 입력 */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          이메일
        </label>
        <input
          id="email"
          type="email"
          placeholder="example@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="focus:border-primary-500 focus:ring-primary-500 mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:ring-2 focus:outline-none"
          disabled={isLoading}
        />
      </div>

      {/* 비밀번호 입력 */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="focus:border-primary-500 focus:ring-primary-500 mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:ring-2 focus:outline-none"
          disabled={isLoading}
        />
      </div>

      {/* 제출 버튼 */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={!isFormValid || isLoading}
        className="mt-6"
      >
        {isLoading ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  )
}
