const createIngredients = `
    CREATE TABLE IF NOT EXISTS ingredients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    id_items INTEGER,
    FOREIGN KEY (id_items) REFERENCES items(id) ON DELETE CASCADE
)`

module.exports = createIngredients
