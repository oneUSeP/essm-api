'use strict'

const Model = use('Model')

class EsStudent extends Model {
  static get primaryKey () {
    return 'studentno'
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

}

module.exports = EsStudent
