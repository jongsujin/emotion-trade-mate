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
    updated_at AS "updatedAt",
    deleted_at AS "deletedAt"
`;

export const FIND_ALL_JOURNALS_QUERY = `
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
  WHERE user_id = $1
  ORDER BY buy_date DESC
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
