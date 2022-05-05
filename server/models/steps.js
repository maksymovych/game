const { Model } = require('../db/db-setup');

module.exports = class Steps extends Model {
  static get tableName() {
    return 'steps';
  }
  static get relationMappings() {
    const AuthUser = require('./authUser');
    const Game = require('./game');
    return {
      game: {
        relation: Model.HasOneRelation,
        modelClass: Game,
        join: {
          from: 'game.id',
          to: 'steps.game_id',
        },
      },
      user_db: {
        relation: Model.HasOneRelation,
        modelClass: AuthUser,
        join: {
          from: 'user_db.id',
          to: 'steps.user_id',
        },
      },
    };
  }
};
