const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const { hash } = require("bcryptjs")

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body
    const hashedPassword = await hash(password, 8)

    const db = await sqliteConnection()
    const checkUserExists = await db.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    )

    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso.")
    }

    await db.run(
      "INSERT INTO users (name, email, password) VALUES (?, ? , ?)",
      [name, email, hashedPassword]
    )

    return res.status(201).json()
  }
}

module.exports = UsersController
