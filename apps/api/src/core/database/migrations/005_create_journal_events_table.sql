CREATE TYPE journal_event_type AS ENUM ('BUY', 'SELL', 'EMOTION', 'NOTE');
CREATE TABLE journal_events (
    id SERIAL PRIMARY KEY,
    journal_id INT NOT NULL REFERENCES journals(id) ON DELETE CASCADE,
    
    type journal_event_type NOT NULL,

    price DECIMAL(15,2) NOT NULL,
    quantity INT,
    memo TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL
)