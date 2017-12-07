'use strict'

const Schema = use('Schema')

class AddNewFieldsToAdmissionSchema extends Schema {
  up () {
    this.table('ES_Admission', (table) => {
      table.boolean('is_reqcomplete').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.table('ES_Admission', (table) => {
      table.dropColumn('is_reqcomplete')
      table.dropColumn('created_at')
      table.dropColumn('updated_at')
    })
  }
}

module.exports = AddNewFieldsToAdmissionSchema
