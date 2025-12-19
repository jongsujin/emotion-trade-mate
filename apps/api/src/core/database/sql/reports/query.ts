export const GET_EMOTION_PERFORMANCE_QUERY = /* sql */ `
  SELECT
    et.code,
    et.label_ko AS "label",
    COUNT(DISTINCT j.id)::int AS "journalCount",
    COUNT(DISTINCT CASE WHEN j.realized_profit > 0 THEN j.id END)::int AS "winCount",
    SUM(j.realized_profit) AS "totalProfit"
  FROM emotion_tags et
  JOIN journal_event_emotions jee ON et.id = jee.emotion_tag_id
  JOIN journal_events je ON jee.event_id = je.id
  JOIN journals j ON je.journal_id = j.id
  WHERE j.user_id = $1
    AND j.deleted_at IS NULL
    -- 확정 손익이 0이 아닌 경우에만 집계 (매매가 발생한 건만)
    -- 혹은 매매가 없어도 감정 기록이 있으면 포함? -> 성과 분석이므로 매매 결과(realized_profit)가 있는 것만 보는 게 의미 있음
    -- 하지만 realized_profit이 0인 경우(본절)도 있을 수 있으므로 조건 신중히
    -- 일단은 모든 일지 기준 (현재가가 없어서 평가손익을 못 쓰므로, 실현손익 기준)
  GROUP BY et.id, et.code, et.label_ko
  HAVING COUNT(DISTINCT j.id) > 0
  ORDER BY "totalProfit" DESC
`;
