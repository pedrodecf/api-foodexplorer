const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

class UserValidatedController {
  async index(req, res) {
    const { id } = req.user

    const db = await sqliteConnection()
    const checkUserExists = await db.get("SELECT * FROM users WHERE id = (?)", [id])

    if (checkUserExists.lenght === 0) {
      alert("User Validated: Não autorizado.")
      throw new AppError("Não autorizado.", 401)
    }

    return res.status(200).json()
  }
}

module.exports = UserValidatedController
