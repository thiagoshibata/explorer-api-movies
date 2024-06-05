const { Router } = require("express")

const routes = Router()

const usersRouter = require("./user.routes")
const moviesRouter = require("./movies.routes")
const sessionsRouter = require("./sessions.routes")
const tagsRouter = require("./tags.routes")

routes.use("/tags", tagsRouter)
routes.use("/users", usersRouter)
routes.use("/movies", moviesRouter)
routes.use("/sessions", sessionsRouter)

module.exports = routes
