# EmotionTrade Web 폴더 구조

## 📁 전체 구조 개요

```
apps/web/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # 인증 라우트 그룹
│   │   ├── layout.tsx          # 인증 레이아웃
│   │   ├── login/              # 로그인 페이지
│   │   └── signup/             # 회원가입 페이지
│   ├── (main)/                  # 메인 앱 라우트 그룹
│   │   ├── layout.tsx          # 메인 레이아웃
│   │   ├── journal/            # 감정 일지
│   │   │   ├── create/         # 일지 생성
│   │   │   ├── list/           # 일지 목록
│   │   │   └── [id]/           # 일지별
│   │   │       ├── page.tsx    # 타임라인
│   │   │       └── emotion/    # 감정 추가
│   │   ├── report/             # AI 리포트
│   │   │   ├── [id]/           # 일지별 리포트
│   │   │   └── summary/        # 전체 리포트
│   │   └── settings/           # 설정
│   ├── layout.tsx              # 루트 레이아웃
│   ├── page.tsx                # 온보딩 (/)
│   ├── error.tsx               # 전역 에러
│   ├── not-found.tsx           # 404
│   └── globals.css             # 전역 스타일
│
├── components/                  # UI 컴포넌트
│   ├── common/                 # 공통 컴포넌트 (버튼, 인풋 등)
│   ├── journal/                # 일지 관련 컴포넌트
│   ├── report/                 # 리포트 관련 컴포넌트
│   ├── settings/               # 설정 관련 컴포넌트
│   ├── onboarding/             # 온보딩 컴포넌트
│   └── layouts/                # 레이아웃 컴포넌트
│
├── features/                    # 도메인별 비즈니스 로직
│   ├── journal/                # 일지 Feature
│   │   ├── services/           # API 호출
│   │   ├── store/              # 상태 관리
│   │   └── utils/              # 유틸리티
│   ├── report/                 # 리포트 Feature
│   ├── auth/                   # 인증 Feature
│   └── ocr/                    # OCR Feature
│
├── hooks/                       # 커스텀 훅
│   ├── useJournals.ts         # 일지 목록 훅
│   ├── useJournal.ts          # 일지 상세 훅
│   ├── useOCR.ts              # OCR 훅
│   ├── useReport.ts           # 리포트 훅
│   └── useAuth.ts             # 인증 훅
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
├── types/                       # 타입 정의 (로컬)
│   └── index.ts                # 전역 타입
│
├── public/                      # 정적 파일
│   ├── images/                 # 이미지
│   └── icons/                  # 아이콘
│
├── tailwind.config.ts          # Tailwind 설정
├── tsconfig.json               # TypeScript 설정
├── next.config.ts              # Next.js 설정
├── postcss.config.mjs          # PostCSS 설정
├── eslint.config.mjs           # ESLint 설정
├── .prettierrc                 # Prettier 설정
├── package.json                # 의존성 관리
└── README.md                   # 프로젝트 문서
```

## 📄 주요 파일 및 폴더 설명

### `app/` - Next.js App Router

- **(auth)**: 인증 관련 페이지 그룹 (특별한 레이아웃 적용)
- **(main)**: 메인 앱 페이지 그룹 (인증 후 접근)
- **[symbol]**: 동적 라우트 (종목 심볼)

### `components/` - UI 컴포넌트

재사용 가능한 프레젠테이션 컴포넌트

- **common**: 버튼, 입력, 카드 등
- **journal**: 일지 카드, 감정 선택기, OCR 업로더
- **report**: 차트, 리포트 카드, PDF 다운로드

### `features/` - 비즈니스 로직

도메인별로 구조화된 비즈니스 로직

- **services**: API 호출 함수
- **store**: Zustand 스토어
- **utils**: 도메인 특화 유틸리티

### `hooks/` - 커스텀 훅

React Query 훅 및 커스텀 훅

### `lib/` - 유틸리티

- **api/client.ts**: HTTP 클라이언트 (fetch 래퍼)
- **utils.ts**: 공통 유틸리티 함수

### `constants/` - 상수

- **emotions.ts**: 감정 타입 및 데이터
- **routes.ts**: 라우트 경로 상수
- **index.ts**: 앱 설정

### `types/` - 타입 정의

로컬 타입 정의 (공통 타입은 `@repo/types`)

## 🎯 라우트 구조

### 인증

- `/login` - 로그인
- `/signup` - 회원가입

### 메인 앱

- `/` - 온보딩
- `/journal/create` - 일지 생성
- `/journal/list` - 일지 목록
- `/journal/[id]` - 일지 상세 (감정 타임라인)
- `/journal/[id]/emotion` - 감정 추가 기록
- `/report/[id]` - 일지별 AI 리포트
- `/report/summary` - 전체 리포트
- `/settings` - 설정

### 에러 페이지

- `/404` - 페이지를 찾을 수 없음
- `/error` - 전역 에러

## 🚀 개발 워크플로우

### 1. 새로운 페이지 추가

```bash
# app/ 폴더에 새 폴더 및 page.tsx 생성
mkdir -p app/new-page
touch app/new-page/page.tsx
```

### 2. 새로운 컴포넌트 추가

```bash
# components/ 폴더에 컴포넌트 생성
mkdir -p components/domain
touch components/domain/ComponentName.tsx
```

### 3. 새로운 Feature 추가

```bash
# features/ 폴더에 도메인 생성
mkdir -p features/domain/{services,store,utils}
```

### 4. 새로운 훅 추가

```bash
# hooks/ 폴더에 훅 생성
touch hooks/useCustomHook.ts
# hooks/index.ts에 export 추가
```

## 📝 코딩 컨벤션

### 파일 네이밍

- 컴포넌트: `PascalCase.tsx`
- 훅: `useCamelCase.ts`
- 유틸: `camelCase.ts`
- 상수: `UPPER_SNAKE_CASE.ts`

### 폴더 네이밍

- 소문자 kebab-case 또는 camelCase
- 도메인별로 명확하게 구분

### Import 순서

1. React 및 외부 라이브러리
2. 내부 컴포넌트
3. Hooks
4. Utils 및 Constants
5. Types
6. Styles

```typescript
// 1. 외부
import { useState } from 'react'
import Link from 'next/link'

// 2. 컴포넌트
import { Button } from '@/components/common'

// 3. Hooks
import { useJournals } from '@/hooks'

// 4. Utils & Constants
import { formatDate } from '@/lib/utils'
import { ROUTES } from '@/constants'

// 5. Types
import type { Journal } from '@/types'
```

## 🎨 스타일링 가이드

### Tailwind 클래스 순서

1. Layout (flex, grid)
2. Spacing (p, m)
3. Sizing (w, h)
4. Typography (text, font)
5. Colors (bg, text)
6. Others

```tsx
<div className="flex items-center justify-between px-4 py-2 w-full text-lg font-bold bg-primary text-white rounded-lg hover:bg-primary/90">
  Content
</div>
```

### 반응형 디자인

모바일 퍼스트 접근

```tsx
<div className="text-sm sm:text-base md:text-lg lg:text-xl">Responsive text</div>
```

## 🔧 유용한 명령어

```bash
# 개발 서버
pnpm dev

# 빌드
pnpm build

# 린트
pnpm lint

# 포맷팅
pnpm format

# 타입 체크
pnpm type-check
```

## 📦 향후 추가 예정

- [ ] React Query 설정
- [ ] Zustand 스토어 구현
- [ ] UI 컴포넌트 라이브러리 (shadcn/ui)
- [ ] 차트 라이브러리 (Recharts)
- [ ] Form 라이브러리 (React Hook Form + Zod)
- [ ] PWA 설정
- [ ] 테스트 설정 (Vitest + Testing Library)
