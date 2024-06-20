const { Router } = require("express")
const MoviesController = require("../controllers/MoviesController")

const ensureAuthenticated = require("../Middleware/ensureAuthenticated")

const movieRouter = Router()

const moviesController = new MoviesController()

movieRouter.use(ensureAuthenticated)

movieRouter.post("/", moviesController.create)
movieRouter.get("/:id", moviesController.show)
movieRouter.get("/", moviesController.index)
movieRouter.delete("/", moviesController.delete)

module.exports = movieRouter
