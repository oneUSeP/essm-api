'use strict'

const Model = use('Model')

class HrEmployee extends Model {
  static get primaryKey () {
    return 'employeeid'
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = HrEmployee
