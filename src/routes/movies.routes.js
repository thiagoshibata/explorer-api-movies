const { Router } = require("express")
const MoviesController = require("../controllers/MoviesController")

const movieRouter = Router()

const moviesController = new MoviesController()

movieRouter.post("/:user_id", moviesController.create)
movieRouter.get("/:id", moviesController.show)
movieRouter.get("/", moviesController.index)

module.exports = movieRouter
