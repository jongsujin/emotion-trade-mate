export const FIND_BY_EMAIL_USER_QUERY = /* sql */ `
  SELECT * FROM users WHERE email = $1
`;

export const FIND_BY_ID_USER_QUERY = /* sql */ `
  SELECT * FROM users WHERE id = $1
`;

export const CREATE_USER_QUERY = /* sql */ `
  INSERT INTO users (nickname, email, password_hash)
  VALUES ($1, $2, $3)
  RETURNING *
`;

export const UPDATE_USER_QUERY = /* sql */ `
  UPDATE users
  SET nickname = COALESCE($2, nickname), email = COALESCE($3, email), password_hash = COALESCE($4, password_hash)
  WHERE id = $1
  RETURNING *
`;
