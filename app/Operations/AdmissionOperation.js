'use strict'

// Operations
const Operation = use('App/Operations/Operation')

// Models
const Admission = use('App/Models/EsAdmission')

// Utils
const HTTPResponse = use('App/Controllers/Http/HttpResponse')

const Database = use('Database')

/**
 * Admission operation class
 *
 * @author glevinzon.dapal <glevinzon.dapal@usep.edu.ph>
 */
class AdmissionOperation extends Operation {

  constructor() {
    super()
    this.scenario = AdmissionOperation.scenarios.DEFAULT
    this.appNo = null

    this.page = null
    this.count = null
  }

  static get scenarios() {
    return {
      DEFAULT: 'default',
      CREATE: 'create',
      UPDATE: 'update',
    }
  }

  get rules() {
    const rules = {}

    const {
      CREATE,
      UPDATE
    } = AdmissionOperation.scenarios

    const customRules = {
      [CREATE]: {
      },
      [UPDATE]: {
        appNo: 'required',
      }
    }

    return this.setRules(rules, customRules)
  }

  /**
   * Create Admission
   *
   * @returns Object
   */
  async save() {
    this.scenario = AdmissionOperation.scenarios.CREATE

    let isValid = await this.validate()

    if (!isValid) {
      return false
    }

    try {
      await Database
        .insert({
          track_name: this.trackName,
          is_active: this.active
        })
        .into('ES_Track')
      return true
    } catch (e) {
      this.addError(e.status, e.message)

      return false
    }
  }

  /**
   * Update Admission
   *
   * @returns Object
   */
  async update() {
    this.scenario = AdmissionOperation.scenarios.UPDATE

    let isValid = await this.validate()

    if (!isValid) {
      return false
    }

    let track = await Database.table('ES_Track').where('track_id', this.trackId).first()

    if (!track) {
      this.addError(HTTPResponse.STATUS_NOT_FOUND, 'Admission not found.')

      return false
    }

    try {
      await Database
        .table('ES_Track')
        .where('track_id', this.trackId)
        .update({
          track_name: this.trackName,
          is_active: this.active
        })
      return await Database.table('ES_Track').where('track_id', this.trackId).first()
    } catch (e) {
      this.addError(e.status, e.message)

      return false
    }
  }

  /**
   * Delete Admission
   *
   * @returns boolean
   */
  async delete() {
    try {
      let track = await Database.table('ES_Track').where('track_id', this.trackId).first()

      if (!track) {
        this.addError(HTTPResponse.STATUS_NOT_FOUND, 'Admission not found.')

        return false
      }
      console.log(this.trackId)
      await Database
      .table('ES_Track')
      .where('track_id', ''+this.trackId)
      .delete()

      return true
    } catch (e) {
      this.addError(e.status, e.message)

      return false
    }
  }

  async list() {
    try {
      if (this.count && this.page)
        return await Database
        .from('ES_Admission')
        .orderBy('AppDate', 'desc')
        .paginate(this.page, this.count)
    } catch (e) {
      this.addError(e.status, e.message)

      return false
    }
  }
}

module.exports = AdmissionOperation
