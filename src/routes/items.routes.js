const { Router } = require("express")
const itemsRoutes = Router()

const multer = require("multer")
const uploadConfig = require("../config/upload")

const upload = multer(uploadConfig.MULTER)

const ensureAuthenticate = require("../middlewares/ensureAuthenticate")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")

const ItemsController = require("../controllers/ItemsController")
const ImgController = require("../controllers/ImgController")

const itemsController = new ItemsController()
const imgController = new ImgController()

itemsRoutes.use(ensureAuthenticate)

itemsRoutes.post("/", verifyUserAuthorization("admin"), itemsController.create)
itemsRoutes.put("/:id", verifyUserAuthorization("admin"), itemsController.update)
itemsRoutes.delete("/:id", verifyUserAuthorization("admin"), itemsController.delete)
itemsRoutes.get("/:id", itemsController.show)
itemsRoutes.get("/", itemsController.index)
itemsRoutes.patch("/img/:id", upload.single("img"), verifyUserAuthorization("admin"), imgController.update)
itemsRoutes.patch("/img", upload.single("img"), verifyUserAuthorization("admin"), imgController.create)

module.exports = itemsRoutes
