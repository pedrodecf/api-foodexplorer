const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const { compare } = require("bcryptjs")
const authConfig = require("../config/auth")
const { sign } = require("jsonwebtoken")

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body
    const db = await sqliteConnection()
    const user = await db.get("SELECT * FROM users WHERE email = (?)", [email])

    if (!user) {
      throw new AppError("E-mail ou senha inválido.", 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError("E-mail ou senha inválido.", 401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn,
    })

    delete user.password

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 15 * 60 * 1000,
    })

    return res.json({ user })
  }
}

module.exports = SessionsController
