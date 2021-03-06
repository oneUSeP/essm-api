'use strict'

const { HttpException } = use('node-exceptions')
const HttpResponse = use('App/Controllers/Http/HttpResponse')

const Database = use('Database')

class EsCampusController {
  async list ({request, response}) {
    let { page, count } = request.all()

    try {
      if (count && page)
        var campuses = await Database
        .connection('es').from('ES_Campus')
        .paginate(page, count)
    } catch (e) {
      this.addError(e.status, e.message)

      return false
    }

    response.send({
      data: { campuses }
    })
  }
}

module.exports = EsCampusController
