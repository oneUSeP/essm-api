'use strict'

const { HttpException } = use('node-exceptions')
const HttpResponse = use('App/Controllers/Http/HttpResponse')

const CivilStatus = use('App/Models/CivilStatus')

const Database = use('Database')

class CivilStatusController {
  async list ({request, response}) {
    let { page, count } = request.all()

    try {
      if (count && page)
        var civilstatuses = await Database
        .from('CivilStatus')
        .paginate(page, count)
    } catch (e) {
      this.addError(e.status, e.message)

      return false
    }

    response.send({
      data: { civilstatuses }
    })
  }
}

module.exports = CivilStatusController
