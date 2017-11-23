'use strict'

const Http = exports = module.exports = {}

Http.handleError = async (error, request, response) => {
  console.log(error)
  response.status(error.status).send(error.message)
}
