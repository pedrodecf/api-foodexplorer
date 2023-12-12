const createItem = `
    CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    img VARCHAR,
    category VARCHAR,
    price DECIMAL,
    description TEXT
)`

module.exports = createItem
