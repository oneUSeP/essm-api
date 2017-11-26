'use strict'

const { HttpException } = use('node-exceptions')
const HttpResponse = use('App/Controllers/Http/HttpResponse')

const EsTestingCenter = use('App/Models/EsTestingCenter')

const Database = use('Database')

class EsTestingCenterController {
  async list ({request, response}) {
    let { page, count } = request.all()

    try {
      if (count && page)
        var testingcenters = await Database
        .from('ES_TestingCenter')
        .paginate(page, count)
    } catch (e) {
      this.addError(e.status, e.message)

      return false
    }

    response.send({
      data: { testingcenters }
    })
  }
}

module.exports = EsTestingCenterController
