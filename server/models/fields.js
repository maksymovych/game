const { Model } = require('../db/db-setup');

module.exports = class Fields extends Model {
  static get tableName() {
    return 'fields';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {

    const Game = require('./game');
    return {
      game: {
        relation: Model.HasOneRelation,
        modelClass: Game,
        join: {
          from: 'game.id',
          to: 'fields.game_id',
        },
      },
    };
  }
};
