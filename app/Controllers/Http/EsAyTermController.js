'use strict'

const { HttpException } = use('node-exceptions')
const HttpResponse = use('App/Controllers/Http/HttpResponse')

const EsAyTerm = use('App/Models/EsAyTerm')

const Database = use('Database')

class EsAyTermController {
  async list ({request, response}) {
    let { page, count } = request.all()

    try {
      if (count && page)
        var ayterms = await Database
        .from('ES_AYTerm')
        .paginate(page, count)
    } catch (e) {
      this.addError(e.status, e.message)

      return false
    }

    response.send({
      data: { ayterms }
    })
  }
}

module.exports = EsAyTermController
