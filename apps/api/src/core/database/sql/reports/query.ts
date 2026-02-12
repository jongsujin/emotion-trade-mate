export const GET_EMOTION_PERFORMANCE_QUERY = /* sql */ `
  WITH emotion_journal AS (
    SELECT DISTINCT
      et.code,
      et.label_ko,
      j.id AS journal_id,
      j.symbol,
      j.realized_profit
    FROM emotion_tags et
    JOIN journal_event_emotions jee ON et.id = jee.emotion_tag_id
    JOIN journal_events je ON jee.event_id = je.id
    JOIN journals j ON je.journal_id = j.id
    WHERE j.user_id = $1
      AND j.deleted_at IS NULL
      AND je.deleted_at IS NULL
  )
  SELECT
    ej.code,
    ej.label_ko AS "label",
    COUNT(DISTINCT ej.journal_id)::int AS "journalCount",
    COUNT(DISTINCT CASE WHEN ej.realized_profit > 0 THEN ej.journal_id END)::int AS "winCount",
    COALESCE(
      SUM(
        ej.realized_profit *
        CASE
          WHEN UPPER(ej.symbol) ~ '^[0-9]{6}$'
            OR UPPER(ej.symbol) LIKE '%.KS'
            OR UPPER(ej.symbol) LIKE '%.KQ'
          THEN 1
          ELSE $2
        END
      ),
      0
    ) AS "totalProfit"
  FROM emotion_journal ej
  GROUP BY ej.code, ej.label_ko
  HAVING COUNT(DISTINCT ej.journal_id) > 0
  ORDER BY "totalProfit" DESC
`;

export const GET_DASHBOARD_SUMMARY_QUERY = `
  WITH latest_event_price AS (
    SELECT DISTINCT ON (journal_id)
      journal_id,
      price
    FROM journal_events
    WHERE deleted_at IS NULL
      AND price IS NOT NULL
    ORDER BY journal_id, created_at DESC
  ),
  normalized AS (
    SELECT
      j.id,
      j.total_quantity,
      j.average_cost,
      j.buy_price,
      j.realized_profit,
      COALESCE(j.current_price, lep.price, j.buy_price) AS effective_current_price,
      CASE
        WHEN UPPER(j.symbol) ~ '^[0-9]{6}$'
          OR UPPER(j.symbol) LIKE '%.KS'
          OR UPPER(j.symbol) LIKE '%.KQ'
        THEN 1
        ELSE $2
      END AS fx_multiplier
    FROM journals j
    LEFT JOIN latest_event_price lep ON lep.journal_id = j.id
    WHERE j.user_id = $1
      AND j.deleted_at IS NULL
  )
  SELECT
    COALESCE(SUM(realized_profit * fx_multiplier), 0) as "realizedProfit",
    COALESCE(SUM(
      CASE WHEN total_quantity > 0
      THEN (effective_current_price - average_cost) * total_quantity * fx_multiplier
      ELSE 0 END
    ), 0) as "unrealizedProfit",
    COALESCE(SUM(
      CASE WHEN total_quantity > 0
      THEN average_cost * total_quantity * fx_multiplier
      ELSE 0 END
    ), 0) as "totalCost",
    COUNT(id) as "tradeCount",
    COUNT(CASE WHEN realized_profit > 0 THEN 1 END) as "winCount"
  FROM normalized
`;

export const GET_RECENT_PNL_QUERY = `
  SELECT
    TO_CHAR(j.updated_at, 'YYYY-MM-DD') as "date",
    SUM(
      j.realized_profit *
      CASE
        WHEN UPPER(j.symbol) ~ '^[0-9]{6}$'
          OR UPPER(j.symbol) LIKE '%.KS'
          OR UPPER(j.symbol) LIKE '%.KQ'
        THEN 1
        ELSE $2
      END
    ) as "profit"
  FROM journals j
  WHERE j.user_id = $1
    AND j.deleted_at IS NULL
    AND j.realized_profit != 0
    AND j.updated_at >= NOW() - INTERVAL '30 days'
  GROUP BY TO_CHAR(j.updated_at, 'YYYY-MM-DD')
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
