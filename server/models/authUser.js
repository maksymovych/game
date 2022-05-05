const { Model } = require('../db/db-setup');

module.exports = class AuthUserModel extends Model {
  static tableName = 'user_db';

  get tableName() {
    return this.tableName;
  }

  static get idColumn() {
    return 'id';
  }

  static relationMappings() {
    const Room = require('./rooms');
    return {
      room: {
        relation: Model.BelongsToOneRelation,
        modelClass: Room,
        join: {
          from: 'users.room_id',
          to: 'rooms.id',
        },
      },
    };
  }

  static get relationMappings() {
    const Steps = require('./');
    const Game = require('./');

    return {
      game: {
        relation: Model.HasManyRelation,
        modelClass: Game,
        join: {
          from: 'user_db.id',
          to: 'game.user1',
        },
      },
      steps: {
        relation: Model.HasManyRelation,
        modelClass: Steps,
        join: {
          from: 'user_db.id',
          to: 'steps.user_id',
        },
      },
    };
  }
};
