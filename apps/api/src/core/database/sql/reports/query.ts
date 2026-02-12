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
    AND je.deleted_at IS NULL
    -- 확정 손익이 0이 아닌 경우에만 집계 (매매가 발생한 건만)
    -- 혹은 매매가 없어도 감정 기록이 있으면 포함? -> 성과 분석이므로 매매 결과(realized_profit)가 있는 것만 보는 게 의미 있음
    -- 하지만 realized_profit이 0인 경우(본절)도 있을 수 있으므로 조건 신중히
    -- 일단은 모든 일지 기준 (현재가가 없어서 평가손익을 못 쓰므로, 실현손익 기준)
  GROUP BY et.id, et.code, et.label_ko
  HAVING COUNT(DISTINCT j.id) > 0
  ORDER BY "totalProfit" DESC
`;

export const GET_DASHBOARD_SUMMARY_QUERY = `
  SELECT
    COALESCE(SUM(realized_profit), 0) as "realizedProfit",
    COALESCE(SUM(
      CASE WHEN total_quantity > 0 AND current_price IS NOT NULL
      THEN (current_price - average_cost) * total_quantity
      ELSE 0 END
    ), 0) as "unrealizedProfit",
    COALESCE(SUM(
      CASE WHEN total_quantity > 0
      THEN average_cost * total_quantity
      ELSE 0 END
    ), 0) as "totalCost",
    COUNT(id) as "tradeCount",
    COUNT(CASE WHEN realized_profit > 0 THEN 1 END) as "winCount"
  FROM journals
  WHERE user_id = $1 AND deleted_at IS NULL
`;

export const GET_RECENT_PNL_QUERY = `
  SELECT
    TO_CHAR(updated_at, 'YYYY-MM-DD') as "date",
    SUM(realized_profit) as "profit"
  FROM journals
  WHERE user_id = $1
    AND deleted_at IS NULL
    AND realized_profit != 0
    AND updated_at >= NOW() - INTERVAL '30 days'
  GROUP BY TO_CHAR(updated_at, 'YYYY-MM-DD')
  ORDER BY "date" ASC
`;

export const GET_TODAY_EMOTION_QUERY = `
  SELECT
    et.code,
    et.label_ko as "label",
    COUNT(*) as "count"
  FROM journal_events je
  JOIN journal_event_emotions jee ON je.id = jee.event_id
  JOIN emotion_tags et ON jee.emotion_tag_id = et.id
  JOIN journals j ON je.journal_id = j.id
  WHERE j.user_id = $1
    AND j.deleted_at IS NULL
    AND je.deleted_at IS NULL
    AND je.created_at >= DATE_TRUNC('day', NOW())
  GROUP BY et.id, et.code, et.label_ko
  ORDER BY "count" DESC
  LIMIT 1
`;
