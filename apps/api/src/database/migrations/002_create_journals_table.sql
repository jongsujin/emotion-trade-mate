CREATE TABLE journals (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    symbol VARCHAR(10) NOT NULL,
    symbol_name VARCHAR(100) NOT NULL,
    buy_price DECIMAL(15,2) NOT NULL,
    initial_quantity INTEGER NOT NULL,
    buy_date DATE NOT NULL,
    total_quantity INTEGER NOT NULL,
    total_cost DECIMAL(15,2) NOT NULL,
    average_cost DECIMAL(15,2) NOT NULL,
    price_updated_at TIMESTAMP, 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL
);