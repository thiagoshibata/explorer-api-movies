const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class MoviesController {
  async create(req, res) {
    const { title, description, rating, tags } = req.body
    const user_id = req.user.id

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

    return res.json()
  }

  async show(req, res) {
    const { id } = req.params

    const movie_notes = await knex("movie_notes").where({ id }).first()
    const movie_tags = await knex("movie_tags")
      .where({ movie_note_id: id })
      .orderBy("name")

    return res.json({ ...movie_notes, movie_tags })
  }
  async delete(req, res) {
    const { id } = req.user.id

    confirm("Tem certeza que deseja excluir?")
    await knex("movie_notes").where({ id }).delete()

    return res.json()
  }
  async index(req, res) {
    const { user_id, title, tags } = req.query

    let movie_notes

    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim())

      movie_notes = await knex("movie_tags")
        .select([
          "movie_notes.id",
          "movie_notes.title",
          "movie_notes.description",
          "movie_notes.rating",
          "movie_notes.user_id",
        ])
        .where("movie_notes.user_id", user_id)
        .whereLike("movie_notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("movie_notes", "movie_notes.id", "movie_tags.movie_note_id")
        .groupBy("movie_notes.title")
    } else {
      movie_notes = await knex("movie_notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title")
    }
    const userTags = await knex("movie_tags").where({ user_id })

    const moviesWithTags = movie_notes.map((movie) => {
      const movieTags = userTags.filter((tag) => tag.movie_note_id === movie.id)
      return {
        ...movie,
        tags: movieTags,
      }
    })

    res.json(moviesWithTags)
  }
}

module.exports = MoviesController
