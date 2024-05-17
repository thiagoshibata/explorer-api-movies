const knex = require("../database/knex")

class MoviesController {
  async create(req, res) {
    const { user_id } = req.params
    return res.send("estou na MoviesController" + user_id)
  }
}

module.exports = MoviesController
