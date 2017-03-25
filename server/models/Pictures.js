const Model = require('objection').Model;
const User = require('./User')
const Itinerary = require('./Itinerary')

class Pictures extends Model {
  static get tableName() {
    return 'pictures'
  }

    static get jsonSchema() {
    return {
      type: 'object',
      required: ['picItinID', 'picUserID', 'url'],

      properties: {
        id:       { type: 'integer'},
        picItinID:  { type: 'integer'},
        picUserID: { type: 'integer'},
        url: { type: 'string', minLength: 1, maxLength: 255},
      }
    };
  }
    static get relationMappings() {
    return {

   
      picItin: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/Itinerary',
        join: {
          from: 'pictures.picItinID',
          to: 'itineraries.id'
        }
      },

  
      picUser: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/User',
        join: {
          from: 'pictures.picUserID',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Pictures;
