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

    return res.status(201).send()
  }
  async show(req, res) {
    const { id } = req.params

    const user = await knex("users").where({ id })

    return res.json(user)
  }
  async index(req, res) {
    const user = await knex("users")

    return res.json(user)
  }
  async update(req, res) {
    const { name, email, password, old_password } = req.body

    const { id } = req.params

    const [user] = await knex("users").where({ id })

    if (!user) {
      throw new AppError("User not found")
    }

    const [userWithUpdateEmail] = await knex("users").where({ email })

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError("This email already used")
    }
    user.name = name ?? user.name
    user.email = email ?? user.email

    if (password && !old_password) {
      throw new AppError(
        "You need to enter your old password to generate a new password"
      )
    }
    console.log(old_password, user.password)
    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError("Old password doesn`t match")
      }

      user.password = await hash(password, 8)
    }

    await knex("users")
      .update({
        name: user.name,
        email: user.email,
        password: user.password,
        updated_at: "DATATIME('NOW')",
      })
      .where({ id })

    return res.json(user)
  }
}

module.exports = UsersController
