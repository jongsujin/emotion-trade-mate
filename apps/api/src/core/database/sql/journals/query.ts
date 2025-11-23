export const INSERT_JOURNAL_QUERY = /* sql */ `
  INSERT INTO journals (
    user_id, symbol, symbol_name, buy_price, initial_quantity, 
    buy_date, total_quantity, total_cost, average_cost, price_updated_at
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  RETURNING *
`;

export const FIND_ALL_JOURNALS_QUERY = `
  SELECT * FROM journals WHERE user_id = $1
  ORDER BY buy_date DESC
  LIMIT $2 OFFSET $3
`;

export const FIND_BY_ID_JOURNAL_QUERY = /* sql */ `
  SELECT * FROM journals WHERE user_id = $1 AND id = $2
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
  RETURNING *
`;
