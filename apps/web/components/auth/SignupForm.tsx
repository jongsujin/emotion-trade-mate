'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/common/Button'
import { signup } from '@/features/auth'
import { SignupFormData } from '@/types/auth'

/**
 * 회원가입 폼 컴포넌트
 */
export default function SignupForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // 유효성 검사
    if (!formData.email || !formData.nickname || !formData.password || !formData.confirmPassword) {
      setError('모든 항목을 입력해주세요')
      return
    }

    if (!formData.email.includes('@')) {
      setError('올바른 이메일 형식을 입력해주세요')
      return
    }

    if (formData.nickname.length < 2) {
      setError('닉네임은 2자 이상이어야 합니다')
      return
    }

    if (formData.nickname.length > 20) {
      setError('닉네임은 20자 이하여야 합니다')
      return
    }

    if (formData.password.length < 8) {
      setError('비밀번호는 8자 이상이어야 합니다')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다')
      return
    }

    setIsLoading(true)

    try {
      const response = await signup({
        email: formData.email,
        nickname: formData.nickname,
        password: formData.password,
      })

      if (!response.success || !response.data) {
        setError(response.error || '회원가입에 실패했습니다')
        return
      }

      // TODO: 토큰 저장 및 자동 로그인 로직 연결
      console.log('Signup success', response.data)
      router.push('/login?signup=success')
    } catch (err) {
      setError(`회원가입 중 오류가 발생했습니다: ${err}`)
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid =
    formData.email &&
    formData.nickname &&
    formData.nickname.length >= 2 &&
    formData.nickname.length <= 20 &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    formData.password.length >= 8

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

      {/* 닉네임 입력 */}
      <div>
        <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
          닉네임
        </label>
        <input
          id="nickname"
          type="text"
          placeholder="2-20자 사이로 입력하세요"
          value={formData.nickname}
          onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
          className="focus:border-primary-500 focus:ring-primary-500 mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:ring-2 focus:outline-none"
          disabled={isLoading}
          maxLength={20}
        />
        {formData.nickname && formData.nickname.length < 2 && (
          <p className="mt-1 text-xs text-gray-500">닉네임은 2자 이상이어야 합니다</p>
        )}
        {formData.nickname && formData.nickname.length > 20 && (
          <p className="mt-1 text-xs text-red-500">닉네임은 20자 이하여야 합니다</p>
        )}
      </div>

      {/* 비밀번호 입력 */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          placeholder="8자 이상 입력하세요"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="focus:border-primary-500 focus:ring-primary-500 mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:ring-2 focus:outline-none"
          disabled={isLoading}
        />
        {formData.password && formData.password.length < 8 && (
          <p className="mt-1 text-xs text-gray-500">비밀번호는 8자 이상이어야 합니다</p>
        )}
      </div>

      {/* 비밀번호 확인 입력 */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          비밀번호 확인
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          className="focus:border-primary-500 focus:ring-primary-500 mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:ring-2 focus:outline-none"
          disabled={isLoading}
        />
        {formData.confirmPassword &&
          formData.password !== formData.confirmPassword &&
          formData.confirmPassword.length > 0 && (
            <p className="mt-1 text-xs text-red-500">비밀번호가 일치하지 않습니다</p>
          )}
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
        {isLoading ? '가입 중...' : '회원가입'}
      </Button>
    </form>
  )
}
