'use strict'

const { HttpException } = use('node-exceptions')
const HttpResponse = use('App/Controllers/Http/HttpResponse')

const EsDisciplineMajor = use('App/Models/EsDisciplineMajor')

const Database = use('Database')

class EsDisciplineMajorController {
  async list ({request, response}) {
    let { page, count } = request.all()

    try {
      if (count && page)
        var majors = await Database
        .from('ES_DisciplineMajors')
        .paginate(page, count)
    } catch (e) {
      this.addError(e.status, e.message)

      return false
    }

    response.send({
      data: { majors }
    })
  }
}

module.exports = EsDisciplineMajorController
