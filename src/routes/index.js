const { Router } = require("express")

const routes = Router()

const usersRouter = require("./user.routes")
const moviesRouter = require("./movies.routes")

routes.use("/users", usersRouter)
routes.use("/movies", moviesRouter)

module.exports = routes
