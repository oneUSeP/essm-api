'use strict'

const { HttpException } = use('node-exceptions')
const AdmissionOperation = use('App/Operations/AdmissionOperation')
const HttpResponse = use('App/Controllers/Http/HttpResponse')

const EsAdmission = use('App/Models/EsAdmission')

class AdmissionController {
  async list ({request, response}) {
    let op = new AdmissionOperation()
    let { page, count } = request.all()

    op.page = page
    op.count = count

    let admissions = await op.list()

    response.send({
      data: { admissions }
    })
  }

  async search ({request, response}) {
    let op = new AdmissionOperation()
    let { keyword } = request.all()

    op.keyword = keyword

    let admissions = await op.search()

    response.send({
      data: { admissions }
    })
  }
}

module.exports = AdmissionController
