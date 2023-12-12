const createUsers = `
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL, 
    password VARCHAR NOT NULL,
    role TEXT DEFAULT 'customer' CHECK (role IN ('admin', 'customer'))
)`

module.exports = createUsers
