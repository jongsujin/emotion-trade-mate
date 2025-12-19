export const UPDATE_CURRENT_PRICE_QUERY = /* sql */ `
  UPDATE journals
  SET current_price = $2, price_updated_at = NOW()
  WHERE id = $1
`;

export const FIND_ACTIVE_JOURNALS_SYMBOLS_QUERY = /* sql */ `
  SELECT id, symbol
  FROM journals
  WHERE status = 'OPEN' AND deleted_at IS NULL
`;
