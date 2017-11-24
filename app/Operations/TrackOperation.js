'use strict'

// Operations
const Operation = use('App/Operations/Operation')

// Models
const Track = use('App/Models/EsTrack')

// Utils
const HTTPResponse = use('App/Controllers/Http/HttpResponse')

const Database = use('Database')

/**
 * Track operation class
 *
 * @author glevinzon.dapal <glevinzon.dapal@usep.edu.ph>
 */
class TrackOperation extends Operation {

  constructor() {
    super()
    this.scenario = TrackOperation.scenarios.DEFAULT
    this.trackName = null
    this.active = null
    this.trackId = null

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
    } = TrackOperation.scenarios

    const customRules = {
      [CREATE]: {
        trackName: 'required',
        active: 'required'
      },
      [UPDATE]: {
        trackId: 'required',
        trackName: 'required',
        active: 'required'
      }
    }

    return this.setRules(rules, customRules)
  }

  /**
   * Create Track
   *
   * @returns Object
   */
  async save() {
    this.scenario = TrackOperation.scenarios.CREATE

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
   * Update Track
   *
   * @returns Object
   */
  async update() {
    this.scenario = TrackOperation.scenarios.UPDATE

    let isValid = await this.validate()

    if (!isValid) {
      return false
    }

    let track = await Database.table('ES_Track').where('track_id', this.trackId).first()

    if (!track) {
      this.addError(HTTPResponse.STATUS_NOT_FOUND, 'Track not found.')

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
   * Delete Track
   *
   * @returns boolean
   */
  async delete() {
    try {
      let track = await Database.table('ES_Track').where('track_id', this.trackId).first()

      if (!track) {
        this.addError(HTTPResponse.STATUS_NOT_FOUND, 'Track not found.')

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
        .from('ES_Track')
        .orderBy('track_name', 'asc')
        .paginate(this.page, this.count)
    } catch (e) {
      this.addError(e.status, e.message)

      return false
    }
  }
}

module.exports = TrackOperation
