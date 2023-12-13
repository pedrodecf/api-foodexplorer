const { verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const authConfig = require("../config/auth")

function ensureAuthenticate(req, res, next) {
  const authHeader = req.headers

  if (!authHeader.cookie) {
    alert("Ensure Authenticate: JWT Token não informado.")
    throw new AppError("JWT Token não informado.", 401)
  }

  const [, token] = authHeader.cookie.split("token=")

  try {
    const { role, sub: user_id } = verify(token, authConfig.jwt.secret)

    req.user = {
      id: Number(user_id),
      role,
    }

    return next()
  } catch {
    throw new AppError("JWT Token inválido.", 401)
  }
}

module.exports = ensureAuthenticate
