const Model = require('objection').Model;
const User = require('./User');
const Entry = require('./Entry');


class Comment extends Model {
  static get tableName() {
    return 'comments'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['contributorID', 'comment', 'entryID' ],

      properties: {
        id:             { type: 'integer'},
        comment:        { type: 'string', minLength: 1, maxLength: 255 },
        contributorID:  { type: 'number' },
        entryID:        { type: 'number' }
      }
    };
  }

  static get relationMappings() {
    return {
  
      // Each entry uniquely belongs to one parent itinerary 
      parentEntry: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/Entry',
        join: {
          from: 'comments.entryID',
          to: 'entries.id'
        }
      },

      // Each entry is uniquely contributed by one user
      contributor: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/User',
        join: {
          from: 'comments.contributorID',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Comment;
