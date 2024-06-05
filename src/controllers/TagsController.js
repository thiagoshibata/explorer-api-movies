const knex = require("../database/knex")

class TagsController {
  async index(req, res) {
    const tags = await knex("movie_tags")

    return res.json(tags)
  }
}

module.exports = TagsController
