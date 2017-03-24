const Model = require('objection').Model;
const User = require('./User')

class Friend extends Model {
  static get tableName() {
    return 'friends'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['friendA', 'friendB'],

      properties: {
        id:       { type: 'integer'},
        friendA:  { type: 'integer'},
        friendB: { type: 'integer'},
      }
    };
  }

  static get relationMappings() {
    return {

      friends1: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/User',
        join: {
          from: 'friends.friendA',
          to: 'users.id'
        }
      },

      friends2: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/User',
        join: {
          from: 'friends.friendB',
          to: 'users.id'
        }
      }
    }

  }

}

module.exports = Friend;
