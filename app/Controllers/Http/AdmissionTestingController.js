'use strict'

const { HttpException } = use('node-exceptions')
const HttpResponse = use('App/Controllers/Http/HttpResponse')

const Database = use('Database')

class AdmissionTestingController {
  async list ({request, response}) {
    let { page, count } = request.all()

    try {
      if (count && page)
        var scheds = await Database
        .from('ES_AdmissionTesting')
        .where('TermID', 171)
        .paginate(page, count)
    } catch (e) {
      this.addError(e.status, e.message)

      return false
    }

    response.send({
      data: { scheds }
    })
  }

  async count ({request, response}) {
    let { testingSchedID } = request.all()

    if (testingSchedID) {
      var sched = await Database
        .from('ES_AdmissionTesting')
        .where('TermID', 171)
        .where('IndexID', testingSchedID)

      var count = await Database
        .from('ES_Admission')
        .where('TermID', 171)
        .where('TestingSchedID', testingSchedID)
        .count('* as actual')
    }

    response.send({data : {count: count[0].actual, sched: sched[0]}})
  }
}

module.exports = AdmissionTestingController
