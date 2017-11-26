'use strict'

const { HttpException } = use('node-exceptions')
const HttpResponse = use('App/Controllers/Http/HttpResponse')

const EsIncomeBracket = use('App/Models/EsIncomeBracket')

const Database = use('Database')

class EsIncomeBracketController {
  async list ({request, response}) {
    let { page, count } = request.all()

    try {
      if (count && page)
        var incomebrackets = await Database
        .from('ES_IncomeBracket')
        .paginate(page, count)
    } catch (e) {
      this.addError(e.status, e.message)

      return false
    }

    response.send({
      data: { incomebrackets }
    })
  }
}

module.exports = EsIncomeBracketController
