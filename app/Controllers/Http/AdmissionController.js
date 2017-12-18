'use strict'

const { HttpException } = use('node-exceptions')
const AdmissionOperation = use('App/Operations/AdmissionOperation')
const HttpResponse = use('App/Controllers/Http/HttpResponse')

const EsAdmission = use('App/Models/EsAdmission')

class AdmissionController {
  async list ({request, response}) {
    let op = new AdmissionOperation()
    let { page, count, filter } = request.all()

    op.page = page
    op.count = count
    op.filter = filter

    let admissions = await op.list()

    response.send({
      data: { admissions }
    })
  }

  async update({request, response}) {
    let op = new AdmissionOperation()
    op.appNo = '' + request.input('appNo')
    op.lastName = '' + request.input('lastName')
    op.firstName = '' + request.input('firstName')
    op.middleName = '' + request.input('middleName')
    op.dateOfBirth = '' + request.input('dateOfBirth')
    op.gender = '' + request.input('gender')
    op.civilStatusId = '' + request.input('civilStatusId')
    op.resBarangay = '' + request.input('resBarangay')
    op.resTownCity = '' + request.input('resTownCity')
    op.email = '' + request.input('email')
    op.telNo = '' + request.input('telNo')
    op.termId = '' + request.input('termId')
    op.choice1CampusId = '' + request.input('choice1CampusId')
    op.choice1Course = '' + request.input('choice1Course')
    op.choice1CourseMajor = '' + request.input('choice1CourseMajor')
    op.choice2CampusId = '' + request.input('choice2CampusId')
    op.choice2Course = '' + request.input('choice2Course')
    op.choice2CourseMajor = '' + request.input('choice2CourseMajor')
    op.choice3CampusId = '' + request.input('choice3CampusId')
    op.choice3Course = '' + request.input('choice3Course')
    op.choice3CourseMajor = '' + request.input('choice3CourseMajor')
    op.father = '' + request.input('father')
    op.fatherOccupation = '' + request.input('fatherOccupation')
    op.fatherIncome = '' + request.input('fatherIncome')
    op.mother = '' + request.input('mother')
    op.motherOccupation = '' + request.input('motherOccupation')
    op.motherIncome = '' + request.input('motherIncome')
    op.emergencyContact = '' + request.input('emergencyContact')
    op.emergencyRelation = '' + request.input('emergencyRelation')
    op.emergencyAddress = '' + request.input('emergencyAddress')
    op.emergencyTelNo = '' + request.input('emergencyTelNo')
    op.elemSchool = '' + request.input('elemSchool')
    op.elemAddress = '' + request.input('elemAddress')
    op.elemInclDates = '' + request.input('elemInclDates')
    op.hsSchool = '' + request.input('hsSchool')
    op.hsAddress = '' + request.input('hsAddress')
    op.hsInclDates = '' + request.input('hsInclDates')
    op.collegeSchool = '' + request.input('collegeSchool')
    op.collegeAddress = '' + request.input('collegeAddress')
    op.collegeInclDates = '' + request.input('collegeInclDates')
    op.trackId = '' + request.input('trackId')
    op.strandId = '' + request.input('strandId')
    op.otherStrand = '' + request.input('otherStrand')
    op.grade9 = '' + request.input('grade9')
    op.grade10 = '' + request.input('grade10')
    op.grade11 = '' + request.input('grade11')
    op.grade12 = '' + request.input('grade12')
    op.testingCenter = '' + request.input('testingCenter')
    op.isReqComplete = '' + request.input('isReqComplete')

    let admission = await op.update()

    if (admission === false) {
      let error = op.getFirstError()

      throw new HttpException(error.message, error.code)
    }

    response.send({ data: { admission } })
  }

  async search ({request, response}) {
    let op = new AdmissionOperation()
    let { keyword, filter } = request.all()
    op.keyword = keyword
    op.filter = filter
    let admissions = await op.search()

    response.send({
      data: { admissions }
    })
  }

  async delete({request, response, params}) {
    let op = new AdmissionOperation()
    op.appNo = params.appNo

    let result = await op.delete()

    if (result === false) {
      let error = op.getFirstError()

      throw new HttpException(error.message, error.code)
    }

    response.send({
      data: { deleteSuccess: result }
    })
  }
}

module.exports = AdmissionController
