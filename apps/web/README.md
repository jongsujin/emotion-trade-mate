# EmotionTrade Web App

감정 기반 투자 일지 서비스의 프론트엔드 애플리케이션입니다.

## 📁 폴더 구조

```
apps/web/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # 인증 관련 페이지 그룹
│   │   ├── login/              # 로그인 페이지
│   │   └── signup/             # 회원가입 페이지
│   ├── (main)/                  # 메인 앱 페이지 그룹
│   │   ├── journal/            # 감정 일지
│   │   │   ├── create/         # 일지 생성
│   │   │   ├── list/           # 일지 목록
│   │   │   └── [symbol]/       # 종목별 상세
│   │   ├── report/             # AI 리포트
│   │   │   ├── [symbol]/       # 종목별 리포트
│   │   │   └── summary/        # 전체 리포트
│   │   └── settings/           # 설정
│   ├── page.tsx                # 온보딩 페이지
│   ├── layout.tsx              # 루트 레이아웃
│   ├── not-found.tsx           # 404 페이지
│   └── error.tsx               # 에러 페이지
│
├── components/                  # UI 컴포넌트
│   ├── common/                 # 공통 컴포넌트
│   ├── journal/                # 일지 관련 컴포넌트
│   ├── report/                 # 리포트 관련 컴포넌트
│   ├── settings/               # 설정 관련 컴포넌트
│   ├── onboarding/             # 온보딩 컴포넌트
│   └── layouts/                # 레이아웃 컴포넌트
│
├── features/                    # 도메인별 비즈니스 로직
│   ├── journal/                # 일지 관련 로직
│   ├── report/                 # 리포트 관련 로직
│   ├── auth/                   # 인증 관련 로직
│   └── ocr/                    # OCR 관련 로직
│
├── hooks/                       # 커스텀 훅
│   └── index.ts
│
├── lib/                         # 유틸리티 및 헬퍼
│   ├── api/                    # API 클라이언트
│   │   ├── client.ts          # HTTP 클라이언트
│   │   └── index.ts
│   └── utils.ts                # 공통 유틸리티
│
├── constants/                   # 상수 정의
│   ├── emotions.ts             # 감정 타입 상수
│   ├── routes.ts               # 라우트 경로
│   └── index.ts                # 전역 설정
│
├── types/                       # 타입 정의
│   └── index.ts
│
├── public/                      # 정적 파일
│   ├── images/
│   └── icons/
│
├── tailwind.config.ts          # Tailwind 설정
├── tsconfig.json               # TypeScript 설정
└── package.json                # 의존성 관리
```

## 🚀 시작하기

### 개발 서버 실행

```bash
# 루트에서
pnpm dev:web

# 또는 apps/web 폴더에서
pnpm dev
```

개발 서버가 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 빌드

```bash
pnpm build
```

### 프로덕션 서버

```bash
pnpm start
```

## 🎨 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (예정)
- **Data Fetching**: TanStack Query (예정)
- **Form**: React Hook Form + Zod (예정)
- **Charts**: Recharts (예정)

## 📄 주요 페이지

### 온보딩 (`/`)

- 서비스 소개
- 3장의 슬라이드
- CTA: 감정 기록하기

### 감정 일지

- `/journal/create` - 일지 생성 (스크린샷 업로드, OCR, 감정 선택)
- `/journal/list` - 일지 목록 (필터링, 정렬)
- `/journal/[id]` - 일지 상세 (감정 타임라인)
- `/journal/[id]/emotion` - 감정 추가 기록

### AI 리포트

- `/report/[id]` - 일지별 AI 리포트
- `/report/summary` - 전체 감정 통계

### 기타

- `/settings` - 설정 페이지
- `/login` - 로그인
- `/signup` - 회원가입

## 🔧 개발 가이드

### 디자인 원칙

1. **모바일 퍼스트**: 모든 UI는 모바일 우선으로 설계
2. **접근성**: 시맨틱 HTML 및 ARIA 속성 준수
3. **성능**: 코드 스플리팅 및 레이지 로딩 적극 활용
4. **타입 안전성**: any 타입 사용 지양

### 코딩 컨벤션

- 컴포넌트는 PascalCase
- 파일명은 PascalCase (컴포넌트) 또는 camelCase (유틸)
- 폴더별 index.ts로 export 정리

### 상태 관리

- 서버 상태: TanStack Query
- 클라이언트 상태: Zustand
- 폼 상태: React Hook Form

## 🌈 브랜드 컬러

- **Primary**: #68CCF4 (청량한 하늘색)
- **감정 컬러**:
  - 기쁨: #FFD93D
  - 두려움: #6C63FF
  - 욕심: #4CAF50
  - 불안: #FF6B6B
  - 자신감: #68CCF4
  - 후회: #95A5A6
  - 중립: #BDC3C7

## 📦 패키지 관리

이 프로젝트는 Turborepo 모노레포의 일부입니다.

- 공통 UI 컴포넌트: `@repo/ui`
- 공통 타입: `@repo/types` (예정)
- 공통 유틸: `@repo/utils` (예정)

## 🔗 관련 링크

- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Turborepo 문서](https://turbo.build/repo/docs)
