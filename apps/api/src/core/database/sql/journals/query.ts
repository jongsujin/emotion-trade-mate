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
    memo = COALESCE($6, memo),
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

export const FIND_BY_ID_JOURNAL_DETAIL_QUERY = `
  SELECT
    j.id,
    j.symbol,
    j.symbol_name AS "symbolName",
    j.buy_date AS "buyDate",
    j.buy_price AS "buyPrice",
    j.initial_quantity AS "initialQuantity",
    j.total_quantity AS "totalQuantity,
    j.total_cost AS "totalCost",
    j.average_cost AS "averageCost",
    j.price_updated_at AS "priceUpdatedAt",
    j.created_at AS "createdAt,

  FROM journals j
  WHERE j.user_id = $1 AND j.id = $2
  `;
