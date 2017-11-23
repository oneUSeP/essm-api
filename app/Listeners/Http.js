'use strict'

const Youch = use('youch')

const Http = exports = module.exports = {}

Http.handleError = async (error, request, response) => {

  const status = error.status || 500

  /**
   * PRODUCTION REPORTER
   */
  console.error(error.stack)

  let jsonResponse = {
    code: status,
    message: error.message
  }

  Response.macro('sendStatus', function (status) {
    this.status(status).send(jsonResponse)
  })
  // await response.status(status).send({ error: jsonResponse })
}

Http.onStart = async () => {
}
