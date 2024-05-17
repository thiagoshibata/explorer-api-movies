const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class MoviesController {
  async create(req, res) {
    const { title, description, rating, tags } = req.body
    const { user_id } = req.params

    if (rating > 5 || rating < 1) {
      throw new AppError("Rating: 0 - 5")
    }

    const [movie_note_id] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id,
    })
    const tagsInsert = tags.map((tag) => {
      return {
        movie_note_id,
        name: tag,
        user_id,
      }
    })

    await knex("movie_tags").insert(tagsInsert)

    return res.json(tagsInsert)
  }
}

module.exports = MoviesController
