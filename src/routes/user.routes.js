const { Router } = require("express")
const multer = require("multer")

const uploadConfig = require("../configs/upload")

const UsersController = require("../controllers/UsersController")
const UserAvatarController = require("../controllers/UserAvatarController")
const ensureAuthenticated = require("../Middleware/ensureAuthenticated")

const userRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

userRoutes.post("/", usersController.create)
userRoutes.get("/:id", usersController.show)
userRoutes.get("/", usersController.index)
userRoutes.put("/", ensureAuthenticated, usersController.update)
userRoutes.delete("/:id", usersController.delete)
userRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
)

module.exports = userRoutes
