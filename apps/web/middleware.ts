import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ROUTES } from './constants/routes'

// 보호된 라우트 목록 (로그인 필요)
const PROTECTED_ROUTES = ['/dashboard', '/journal', '/report', '/settings']

// 인증 페이지 목록 (로그인 상태에서 접근 불가)
const AUTH_ROUTES = ['/login', '/signup']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 쿠키에서 accessToken 확인 (httpOnly 쿠키 이름: accessToken)
  // nextjs-auth-token 등의 라이브러리나 백엔드 쿠키 설정에 따라 이름이 다를 수 있음
  // 여기서는 'accessToken'으로 가정
  const accessToken = request.cookies.get('accessToken')

  // 1. 루트 경로('/') 접근 시 로그인 되어있으면 대시보드로 리다이렉트
  if (pathname === '/') {
    if (accessToken) {
      return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url))
    }
    return NextResponse.next()
  }

  // 2. 보호된 라우트 접근 시 로그인 안되어있으면 로그인 페이지로
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route))

  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL(ROUTES.LOGIN, request.url)
    // 로그인 후 원래 가려던 페이지로 돌아오기 위해 from 쿼리 추가 가능
    // loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // 3. 인증 페이지(로그인/회원가입) 접근 시 이미 로그인 되어있으면 대시보드로
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url))
  }

  return NextResponse.next()
}

export const config = {
  // 미들웨어가 실행될 경로 패턴
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
