module.exports = {
  SHIPS_SIZES: { one: 1, two: 2, three: 3, four: 4 },

  FIELD_SIZE: 10,

  MARK: {
    new: 4,
    ship: 3,
    hit: 2,
    miss: 1,
    notAvailable: 0,
    empty: -1,
  },

  SHIP_TYPE: {
    FOUR: 4,
    THREE: 3,
    TWO: 2,
    ONE: 1,
  },

  SHIPS: {
    [1]: { size: 1, amount: 4 },
    [2]: { size: 2, amount: 3 },
    [3]: { size: 3, amount: 2 },
    [4]: { size: 4, amount: 1 },
  },

  STATUS_GAME: {
    started: 'started',
    finished: 'finished',
    created: 'created',
    cancel: 'cancel',
  },
  STEP_STATUS: { hit: 'hit', miss: 'miss', skip: 'skip' },
};
