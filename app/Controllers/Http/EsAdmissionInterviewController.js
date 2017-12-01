'use strict'

const { HttpException } = use('node-exceptions')
const HttpResponse = use('App/Controllers/Http/HttpResponse')
const moment = require('moment')

const EsAdmissionInterview = use('App/Models/EsAdmissionInterview')

const Database = use('Database')

class EsAdmissionInterviewController {
  async list ({request, response}) {
    let { page, count } = request.all()

    try {
      if (count && page)
        var interviews = await Database
        .from('ES_AdmissionInterview')
        .whereRaw('InterviewDate >= ?', [moment('2017/01/01').format('YYYY-MM-DD')])
        .orderBy('InterviewDate', 'desc')
        .paginate(page, count)
    } catch (e) {
      this.addError(e.status, e.message)

      return false
    }

    response.send({
      data: { interviews }
    })
  }
}

module.exports = EsAdmissionInterviewController
