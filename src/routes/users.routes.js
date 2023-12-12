const { Router } = require("express")
const usersRoutes = Router()

const UsersController = require("../controllers/UserController")
const usersController = new UsersController()

const UserValidatedController = require("../controllers/UserValidatedController")
const userValidatedController = new UserValidatedController()

const ensureAuthenticate = require("../middlewares/ensureAuthenticate")

usersRoutes.post("/", usersController.create)
usersRoutes.get("/validated", ensureAuthenticate, userValidatedController.index)

module.exports = usersRoutes
