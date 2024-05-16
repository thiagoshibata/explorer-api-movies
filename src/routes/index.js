const  { Router } = require("express")

const routes = Router()

routes.get("/", (request, response) => {
  response.send("First router")
})

module.exports = routes;
