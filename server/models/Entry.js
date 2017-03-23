const Model = require('objection').Model;
const User = require('./User')
const Itinerary = require('./Itinerary')

class Entry extends Model {
  static get tableName() {
    return 'entries'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['title', 'body', 'lat', 'lng', 'name', 'address', 'contributorID', 'itinID' ],

      properties: {
        id:             { type: 'integer'},
        title:          { type: 'string', minLength: 1, maxLength: 255 },
        body:           { type: 'string', minLength: 1, maxLength: 255 },
        lat:            { type: 'number', minLength: 1 },
        lng:            { type: 'number', minLength: 1 },
        name:           { type: 'string', minLength: 1, maxLength: 255 },
        address:        { type: 'string', minLength: 1, maxLength: 255 },
        contributorID:  { type: 'integer', minLength: 1 },
        itinID:         { type: 'integer', minLength: 1 }
      }
    };
  }

  static get relationMappings() {
    return {
      
      // Each entry uniquely belongs to one parent itinerary 
      parentItin: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/Itinerary',
        join: {
          from: 'entries.itinID',
          to: 'itineraries.id'
        }
      },

      // Each entry is uniquely contributed by one user
      contributor: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/User',
        join: {
          from: 'entries.contributorID',
          to: 'users.id'
        }
      }
    }
  }

}

module.exports = Entry;
