'use strict'

const Model = use('Model')

class Token extends Model {
  employee () {
    return this.belongsTo('App/Models/HrEmployee')
  }
  student () {
    return this.belongsTo('App/Models/EsStudent')
  }
}

module.exports = Token
