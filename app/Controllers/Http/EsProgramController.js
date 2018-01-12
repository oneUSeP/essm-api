'use strict'

const { HttpException } = use('node-exceptions')
const HttpResponse = use('App/Controllers/Http/HttpResponse')

const Database = use('Database')

class EsProgramController {
  async list ({request, response}) {
    let { page, count } = request.all()

    try {
      if (count && page)
        var programs = await Database
        .connection('es').from('ES_Programs')
        .paginate(page, count)
    } catch (e) {
      this.addError(e.status, e.message)

      return false
    }

    response.send({
      data: { programs }
    })
  }
}

module.exports = EsProgramController
