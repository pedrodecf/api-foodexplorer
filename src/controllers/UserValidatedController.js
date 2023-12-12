const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

class UserValidatedController {
  async index(req, res) {
    const { user } = req

    const db = await sqliteConnection()
    const checkUserExists = await db.get(
      "SELECT * FROM users WHERE id = (?)",
      [user.id]
    )

    if (checkUserExists.lenght === 0) {
      throw new AppError("Não autorizado.", 401)
    }

    return res.status(200).json()
  }
}

module.exports = UserValidatedController
