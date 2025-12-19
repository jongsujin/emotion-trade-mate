# Emotion Trade 2.0 Product Requirements Document (PRD)

## 1. 프로젝트 개요 (Overview)

**Emotion Trade**는 투자자의 '감정'과 '수익률'의 상관관계를 분석하여, 뇌동매매를 방지하고 건강한 투자 습관을 형성하도록 돕는 **감정 기반 투자 저널링 서비스**입니다.

### 핵심 가치 (Core Value)

1. **기록의 시각화**: 매매 순간의 감정을 이모지로 직관적으로 기록
2. **패턴 발견**: "나는 어떤 감정일 때 돈을 잃는가?"에 대한 객관적 데이터 제공
3. **멘탈 케어**: 투자 실패의 원인을 감정에서 찾아 심리적 안정 유도

---

## 2. 2.0 버전 목표 (v2.0 Goals)

현재 1.0(MVP)은 단순 기록 저장소 수준입니다. 2.0에서는 **"분석과 피드백"** 기능을 강화하여 사용자가 실제 효용을 느끼도록 합니다.

1. **데이터 현실화**: 실시간/지연 시세 연동으로 정확한 수익률 제공
2. **AI 리포트 도입**: 감정별 승률/수익률 분석 기능 추가
3. **UX 고도화**: Toss 스타일의 직관적이고 감성적인 인터페이스 완성

---

## 3. 핵심 기능 명세 (Feature Specifications)

### A. 기초 데이터 강화 (Foundation)

| 기능 ID | 기능명 | 설명 | 우선순위 |
|Data-01| 외부 시세 연동 | 국내/해외 주식, 코인 현재가 주기적 업데이트 (10분 단위) | P0 |
|Data-02| 실현 손익 계산 | 부분 매도(SELL) 시 확정 수익금을 별도 컬럼에 저장 및 합산 | P0 |

### B. 감정 분석 리포트 (Analytics)

| 기능 ID | 기능명 | 설명 | 우선순위 |
|Report-01| 감정별 승률 | "탐욕(🤑)일 때 매수하면 승률 20%" 등 감정 태그별 성과 분석 | P1 |
|Report-02| 워스트 감정 | 손실을 가장 많이 유발한 '위험 감정' 경고 | P1 |
|Report-03| 월간 요약 | 월별 누적 수익금, 매매 횟수, 주된 감정 흐름 타임라인 | P2 |

### C. UX 개선 (User Experience)

| 기능 ID | 기능명 | 설명 | 우선순위 |
|UX-01| 리스트 카드 고도화 | 종목 리스트에서 '대표 감정'과 '실시간 수익률' 즉시 확인 | P1 |
|UX-02| 감정 타임라인 | 상세 화면에서 주가 차트 위에 감정 이모지를 오버레이 (TradingView 스타일) | P2 |

---

## 4. API 명세서 (API Specification v2.0)

### 1. 일지 (Journals) - 기존 보완

- **GET /journals** (Response 변경)
  - `currentPrice`: 현재가 추가
  - `profitRate`: 수익률 추가
  - `mainEmotion`: 해당 종목에서 가장 빈번했던 감정 (예: "FEAR") 추가

### 2. 리포트 (Reports) - **신규**

Base URL: `/reports`

#### 2.1 감정별 성과 분석

- **GET /reports/emotions/performance**
- **Description**: 감정 태그별 평균 수익률과 승률을 반환
- **Response**:

```json
{
  "bestEmotion": { "code": "CALM", "winRate": 80.5, "avgProfit": 12.3 },
  "worstEmotion": { "code": "GREED", "winRate": 10.0, "avgProfit": -5.4 },
  "details": [
    { "emotionCode": "FEAR", "count": 12, "winRate": 45.0, "avgProfit": -1.2 },
    ...
  ]
}
```

#### 2.2 월간 요약

- **GET /reports/monthly?year=2024&month=12**
- **Response**:

```json
{
  "totalProfit": 1500000,
  "tradeCount": 23,
  "dominantEmotion": "ANXIOUS",
  "dailyMoods": [{ "date": "2024-12-01", "emotion": "HAPPY", "profit": 20000 }]
}
```

### 3. 외부 시세 (Market) - **신규 (서버 내부용)**

- **Note**: 클라이언트가 직접 호출하지 않고 서버 스케줄러가 사용
- **Service**: `MarketDataService` (NestJS Schedule)
- **Logic**:
  - 매 10분마다 `journals` 테이블의 모든 종목 심볼 수집
  - 외부 API(한투 등) 일괄 조회
  - `journals` 테이블 `current_price`, `price_updated_at` 업데이트

---

## 5. 추후 개선 로드맵 (Roadmap)

### v2.1 (커뮤니티)

- 다른 사람의 "공포" 매수 타점 구경하기
- 익명 감정 투표 기능 ("지금 시장 분위기는? 😱공포 vs 🤑탐욕")

### v2.2 (AI 어드바이저)

- 사용자 매매 패턴 학습 후 장중 알림 발송
- "지금 '탐욕' 상태이신가요? 과거 이럴 때 80% 확률로 손실이 났습니다. 한 번 더 생각해보세요."

### v2.3 (자산 연동)

- 마이데이터(혹은 증권사 API) 연동으로 매매 내역 자동 불러오기
- 사용자는 '감정'만 태깅하면 되도록 자동화
