'use strict'

const { HttpException } = use('node-exceptions')
const HttpResponse = use('App/Controllers/Http/HttpResponse')

const Database = use('Database')

class EsStrandController {
  async list ({request, response}) {
    let { page, count } = request.all()

    try {
      if (count && page)
        var strands = await Database
        .connection('es').from('ES_Strand')
        .paginate(page, count)
    } catch (e) {
      this.addError(e.status, e.message)

      return false
    }

    response.send({
      data: { strands }
    })
  }
}

module.exports = EsStrandController
