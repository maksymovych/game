const { Model } = require('../db/db-setup');

module.exports = class Game extends Model {
  static get tableName() {
    return 'game';
  }

  static get relationMappings() {
    const AuthUser = require('./authUser');
    const Fields = require('./fields');

    return {
      users_db: {
        relation: Model.HasManyRelation,
        modelClass: AuthUser,
        join: {
          from: 'game.user1',
          to: 'user_db.id',
        },
      },
      game: {
        relation: Model.HasOneRelation,
        modelClass: Fields,
        join: {
          from: 'game.id',
          to: 'fields.game_id',
        },
      },
    };
  }
};
