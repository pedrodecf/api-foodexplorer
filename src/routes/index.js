const { Router } = require("express")
const routes = Router()

const usersRoutes = require("./users.routes")
const itemsRoutes = require("./items.routes")
const sessionsRoutes = require("./sessions.routes")

routes.use("/users", usersRoutes)
routes.use("/items", itemsRoutes)
routes.use("/sessions", sessionsRoutes)

module.exports = routes