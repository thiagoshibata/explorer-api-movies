const { Router } = require("express")
const UsersController = require("../controllers/UsersController")

const userRouter = Router()

const usersController = new UsersController()

userRouter.post("/", usersController.create)
userRouter.get("/:id", usersController.show)
userRouter.get("/", usersController.index)

module.exports = userRouter
