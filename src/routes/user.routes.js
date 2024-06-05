const { Router } = require("express")

const UsersController = require("../controllers/UsersController")
const ensureAuthenticated = require("../Middleware/ensureAuthenticated")

const userRouter = Router()

const usersController = new UsersController()

userRouter.post("/", usersController.create)
userRouter.get("/:id", usersController.show)
userRouter.get("/", usersController.index)
userRouter.put("/", ensureAuthenticated, usersController.update)
userRouter.delete("/:id", usersController.delete)

module.exports = userRouter
