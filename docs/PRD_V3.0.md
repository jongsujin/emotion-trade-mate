# Emotion Trade 3.0 Product Requirements Document (PRD)

## 1. 프로젝트 개요 (Overview) - "Simpler & Visual"

V3.0의 핵심은 **"데이터의 단순화(Simplification)"**와 **"강력한 시각화(Visualization)"**입니다.
복잡한 다중 감정 기록 방식을 **"지배적 감정(Dominant Emotion) 하나"**로 제한하여 데이터 분석의 명확성을 높이고,
이를 바탕으로 직관적인 대시보드를 제공하여 사용자가 본능적으로 자신의 상태를 파악하게 합니다.

---

## 2. 3.0 핵심 변경 사항 (Key Changes)

| 구분            | V2.0 (Existing)              | V3.0 (New Direction)                     |
| :-------------- | :--------------------------- | :--------------------------------------- |
| **감정 기록**   | 다중 선택 가능 (복합 감정)   | **단일 선택 (지배적 감정 1개)**          |
| **데이터 목적** | 단순 기록 저장               | **패턴 분석을 위한 명확한 신호(Signal)** |
| **메인 화면**   | 텍스트 리스트 (Journal List) | **통합 대시보드 (Visual Dashboard)**     |
| **디자인 언어** | 정적인 테이블 UI             | **Motion & Glassmorphism (Interactive)** |

---

## 3. 상세 기능 명세 (Feature Specifications)

### A. 감정 기록 정책 변경 (Simplification)

"어떤 감정이 내 계좌를 망쳤는가?"를 명확히 찾기 위해 정책을 변경합니다.

- **정책**: 하나의 이벤트(매수/매도/기록)에는 **오직 하나의 감정**만 태깅 가능.
- **UX 변경**: 체크박스(Checkbox) 형태의 UI를 **라디오 버튼(Select/Radio)** 형태로 변경.
- **기대 효과**: `GROUP BY` 쿼리가 단순해지고, "불안해서 잃었다" vs "욕심나서 잃었다"의 인과관계가 뚜렷해짐.

### B. 메인 대시보드 (Dashboard Center)

앱 진입 시 4가지 핵심 위젯을 통해 내 상태를 즉시 브리핑합니다.

#### 1. 자산 추세 (Asset Trend)

- **Visual**: Recharts Area/Line Chart + Gradient Fill.
- **Data**: 일별 누적 수익금 흐름. "우상향 중인가?"를 한눈에 확인.

#### 2. 감정 기상청 (Emotion Weather)

- **Visual**: 오늘의 '지배적 감정'을 날씨 아이콘(이모지)으로 표현. (Animated)
- **Context**: "오늘 '조급함'이 지배적이에요. 매매 빈도를 줄이세요."

#### 3. 트레이딩 히트맵 (Trading Garden)

- **Visual**: GitHub Contribution 스타일의 365일 히트맵.
- **Logic**: 수익일은 빨강(Red), 손실일은 파랑(Blue)으로 채도 조절.

#### 4. AI 인사이트 (One-Liner)

- **Visual**: Glassmorphism 카드 + 강조 텍스트.
- **Content**: "과거 '공포' 상태일 때 승률은 10%였습니다. 지금 매수를 멈추세요."

### C. 상세 차트 (Advanced Charts)

- **Emotion Performance**: 감정 태그별 수익률 막대 그래프 (Bar Chart).
- **Win Rate Donut**: 승률 시각화.

---

## 4. 백엔드 요구사항 (Backend Requirements)

### 4.1 데이터 구조 변경 대응

- **DTO 변경**: 감정 입력 필드를 배열(`string[]`)에서 단일 값(`string`)으로 변경 권장 (하위 호환성을 위해 배열의 0번만 사용하거나 API 버전 업).
- **Aggregation**: 감정이 1:1 관계(Event:Emotion)에 가까워지므로, `JOIN` 및 `GROUP BY` 성능이 자연스럽게 향상됨.

### 4.2 대시보드 API (`GET /reports/dashboard`)

- 대시보드 로딩 속도를 위해 단일 API로 모든 요약 데이터를 반환.
- **Response Structure**:
  ```typescript
  interface DashboardResponse {
    summary: { totalProfit: number; winRate: number };
    dailyPnl: { date: string; profit: number }[]; // Chart Data
    todayEmotion: { code: string; label: string }; // Weather Data
  }
  ```

---

## 5. 단계별 구현 계획 (Roadmap)

### Phase 1: 시각화 환경 구축

- [ ] FE: `recharts`, `framer-motion` 설치 및 테마 설정
- [ ] FE: 차트용 더미 데이터(Mock Data) 생성 및 UI 프로토타이핑

### Phase 2: 대시보드 개발

- [ ] BE: `ReportsService`에 대시보드 집계 로직 구현 (단일 감정 기준 최적화)
- [ ] FE: 4대 위젯 구현 및 대시보드 페이지 조립

### Phase 3: 감정 입력 단순화 적용

- [ ] BE: `JournalEvents` 생성/수정 로직에서 감정 단일 처리로 변경
- [ ] FE: 감정 선택 모달 UI를 '단일 선택'으로 교체
