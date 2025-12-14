export const INSERT_JOURNAL_QUERY = /* sql */ `
  INSERT INTO journals (
    user_id, symbol, symbol_name, buy_price, initial_quantity,
    buy_date, total_quantity, total_cost, average_cost, price_updated_at
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  RETURNING
    id,
    user_id AS "userId",
    symbol,
    symbol_name AS "symbolName",
    buy_price AS "buyPrice",
    initial_quantity AS "initialQuantity",
    buy_date AS "buyDate",
    total_quantity AS "totalQuantity",
    total_cost AS "totalCost",
    average_cost AS "averageCost",
    price_updated_at AS "priceUpdatedAt",
    created_at AS "createdAt",
    updated_at AS "updatedAt"
`;

export const INSERT_JOURNAL_EVENT_QUERY = /* sql */ `
  INSERT INTO journal_events (
     journal_id, type, price, quantity, memo
  )
  VALUES ($1, $2, $3, $4, $5)
  RETURNING
    id,
    journal_id AS "journalId",
    type,
    price,
    quantity,
    memo,
    created_at AS "createdAt",
    updated_at AS "updatedAt"
`;

export const FIND_ALL_JOURNALS_QUERY = /* sql */ `
  WITH latest AS (
    SELECT DISTINCT ON (journal_id)
      id,
      journal_id,
      type,
      price,
      quantity,
      memo,
      created_at
    FROM journal_events
    WHERE deleted_at IS NULL
    ORDER BY journal_id, created_at DESC
  ),
  counts AS (
    SELECT journal_id, COUNT(*)::int AS event_count
    FROM journal_events
    WHERE deleted_at IS NULL
    GROUP BY journal_id
  )
  SELECT
    j.id,
    j.user_id AS "userId",
    j.symbol,
    j.symbol_name AS "symbolName",
    j.buy_price AS "buyPrice",
    j.initial_quantity AS "initialQuantity",
    j.buy_date AS "buyDate",
    j.total_quantity AS "totalQuantity",
    j.total_cost AS "totalCost",
    j.average_cost AS "averageCost",
    j.price_updated_at AS "priceUpdatedAt",
    j.created_at AS "createdAt",
    j.updated_at AS "updatedAt",
    j.deleted_at AS "deletedAt",

    COALESCE(c.event_count, 0) AS "eventCount",

    -- latestEvent를 컬럼으로 펼쳐서 내려주기(매핑 쉬움)
    l.id AS "latestEventId",
    l.type AS "latestEventType",
    l.price AS "latestEventPrice",
    l.quantity AS "latestEventQuantity",
    l.memo AS "latestEventMemo",
    l.created_at AS "latestEventCreatedAt"

  FROM journals j
  LEFT JOIN counts c ON c.journal_id = j.id
  LEFT JOIN latest l ON l.journal_id = j.id

  WHERE j.user_id = $1
    AND j.deleted_at IS NULL

  ORDER BY j.buy_date DESC
  LIMIT $2 OFFSET $3
`;

export const FIND_BY_ID_JOURNAL_QUERY = /* sql */ `
  SELECT 
    id,
    user_id AS "userId",
    symbol,
    symbol_name AS "symbolName",
    buy_price AS "buyPrice",
    initial_quantity AS "initialQuantity",
    buy_date AS "buyDate",
    total_quantity AS "totalQuantity",
    total_cost AS "totalCost",
    average_cost AS "averageCost",
    price_updated_at AS "priceUpdatedAt",
    created_at AS "createdAt",
    updated_at AS "updatedAt",
    deleted_at AS "deletedAt"
  FROM journals
  LEFT JOIN journal_events ON journals.id = journal_events.journal_id
  WHERE user_id = $1 AND id = $2
`;

export const DELETE_JOURNAL_QUERY = /* sql */ `
  DELETE FROM journals 
  WHERE user_id = $1 AND id = $2
  RETURNING id
`;

export const COUNT_ALL_JOURNALS_QUERY = `
  SELECT COUNT(*) FROM journals WHERE user_id = $1
`;

export const UPDATE_JOURNAL_QUERY = /* sql */ `
  UPDATE journals
  SET
    buy_price = COALESCE($3, buy_price),
    total_quantity = COALESCE($4, total_quantity),
    emotion_id = COALESCE($5, emotion_id),
    updated_at = NOW()
  WHERE user_id = $1 AND id = $2
  RETURNING 
    id,
    user_id AS "userId",
    symbol,
    symbol_name AS "symbolName",
    buy_price AS "buyPrice",
    initial_quantity AS "initialQuantity",
    buy_date AS "buyDate",
    total_quantity AS "totalQuantity",
    total_cost AS "totalCost",
    average_cost AS "averageCost",
    price_updated_at AS "priceUpdatedAt",
    created_at AS "createdAt",
    updated_at AS "updatedAt",
    deleted_at AS "deletedAt"
`;

// 일지 상세 정보 조회 (journal 정보만)
export const FIND_BY_ID_JOURNAL_DETAIL_QUERY = /* sql */ `
  SELECT
    id,
    symbol,
    symbol_name AS "symbolName",
    buy_date AS "buyDate",
    buy_price AS "buyPrice",
    initial_quantity AS "initialQuantity",
    total_quantity AS "totalQuantity",
    total_cost AS "totalCost",
    average_cost AS "averageCost",
    price_updated_at AS "priceUpdatedAt",
    created_at AS "createdAt"
  FROM journals
  WHERE user_id = $1 AND id = $2
`;

// 일지별 감정 기록 조회
export const FIND_EMOTIONS_BY_JOURNAL_ID_QUERY = /* sql */ `
  SELECT
    id,
    emotion_id AS "emotionCode",
    price,
    quantity,
    memo,
    created_at AS "createdAt"
  FROM emotions
  WHERE journal_id = $1
  ORDER BY created_at DESC
`;

// 일지 이벤트 + 감정 정보 조회 (JournalDetailResponseDto용)
export const FIND_JOURNAL_EVENTS_WITH_EMOTIONS_QUERY = /* sql */ `
  SELECT
    je.id,
    je.type,
    je.price,
    je.quantity,
    je.memo,
    je.created_at AS "createdAt",
    COALESCE(
      json_agg(
        json_build_object(
          'code', et.code,
          'label', et.label_ko
        )
      ) FILTER (WHERE et.id IS NOT NULL),
      '[]'::json
    ) AS emotions
  FROM journal_events je
  LEFT JOIN journal_event_emotions jee ON je.id = jee.event_id
  LEFT JOIN emotion_tags et ON jee.emotion_tag_id = et.id
  WHERE je.journal_id = $1
  GROUP BY je.id, je.type, je.price, je.quantity, je.memo, je.created_at
  ORDER BY je.created_at DESC
`;
