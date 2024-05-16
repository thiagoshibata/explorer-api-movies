const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { hash, compare } = require("bcryptjs")

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body
    const [checkUserExists] = await knex("users").where({ email })

    if (checkUserExists) {
      throw new AppError("This User already exists! Train again with new email")
    }

    const hashedPassword = await hash(password, 8)
    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    })

    res.status(201).send()
  }
  async show(req, res) {
    const { id } = req.params

    const user = await knex("users").where({ id })

    res.json(user)
  }
  async index(req, res) {
    const user = await knex("users")

    res.json(user)
  }
}

module.exports = UsersController
