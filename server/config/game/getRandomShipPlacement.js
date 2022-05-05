const {
  FIELD_SIZE,
  MARK,
  SHIPS,
  SHIP_TYPE,
} = require('./constants/gameConstants');

let shipsField;

const randomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

const randomCoordinates = (size, isHorizontal) => {
  return {
    y: randomNumber(FIELD_SIZE + (!isHorizontal ? 1 - size : 0)),
    x: randomNumber(FIELD_SIZE + (isHorizontal ? 1 - size : 0)),
  };
};

const horizontalOrVertical = () => {
  return 0.5 < Math.random();
};

const markNotAvailable = (row, column) => {
  return (shipsField[row][column] = MARK.notAvailable);
};
const verticalLoop = (row, column, size) => {
  for (let i = 0; i < size; i++) {
    markNotAvailable(row + i, column);
  }
  if (row > 0) {
    markNotAvailable(row - 1, column);
  }
  if (row + size < FIELD_SIZE) {
    markNotAvailable(row + size, column);
  }
};

const horizontalLoop = (row, column, size) => {
  for (let i = 0; i < size; i++) {
    markNotAvailable(row, column + i);
  }
  if (column > 0) {
    markNotAvailable(row, column - 1);
  }
  if (column + size < FIELD_SIZE) {
    markNotAvailable(row, column + size);
  }
};

const fieldsAround = (isHorizontal, size, row, column) => {
  if (isHorizontal) {
    if (row > 0) {
      horizontalLoop(row - 1, column, size);
    }
    if (row < FIELD_SIZE - 1) {
      horizontalLoop(row + 1, column, size);
    }
    if (column > 0) {
      markNotAvailable(row, column - 1);
    }
    if (column + size < FIELD_SIZE) {
      markNotAvailable(row, column + size);
    }
  } else {
    if (column > 0) {
      verticalLoop(row, column - 1, size);
    }
    if (column < FIELD_SIZE - 1) {
      verticalLoop(row, column + 1, size);
    }
    if (row > 0) {
      markNotAvailable(row - 1, column);
    }
    if (row + size < FIELD_SIZE) {
      markNotAvailable(row + size, column);
    }
  }
};

const putShip = (isHorizontal, length, y, x) => {
  for (let i = 0; i < length; i++) {
    if (isHorizontal) {
      shipsField[y][x + i] = MARK.new;
    } else {
      shipsField[y + i][x] = MARK.new;
    }
  }
};

let shipAmount = 0;
const applyShipOnField = (isHorizontal, size, y, x) => {
  if (size === SHIP_TYPE.FOUR || size === SHIP_TYPE.ONE) {
    putShip(isHorizontal, size, y, x);
    fieldsAround(isHorizontal, size, y, x);
    shipAmount--;
    return;
  } else if (
    size === SHIP_TYPE.THREE &&
    isHorizontal &&
    shipsField[y][x + 1] === MARK.empty &&
    shipsField[y][x + 2] === MARK.empty
  ) {
    putShip(isHorizontal, size, y, x);
    fieldsAround(isHorizontal, size, y, x);
    shipAmount--;
    return;
  } else if (
    size === SHIP_TYPE.THREE &&
    !isHorizontal &&
    shipsField[y + 1][x] === MARK.empty &&
    shipsField[y + 2][x] === MARK.empty
  ) {
    putShip(isHorizontal, size, y, x);
    fieldsAround(isHorizontal, size, y, x);
    shipAmount--;
    return;
  } else if (
    size === SHIP_TYPE.TWO &&
    isHorizontal &&
    shipsField[y][x + 1] === MARK.empty
  ) {
    putShip(isHorizontal, size, y, x);
    fieldsAround(isHorizontal, size, y, x);
    shipAmount--;
    return;
  } else if (
    size === SHIP_TYPE.TWO &&
    !isHorizontal &&
    shipsField[y + 1][x] === MARK.empty
  ) {
    putShip(isHorizontal, size, y, x);
    fieldsAround(isHorizontal, size, y, x);
    shipAmount--;
    return;
  }
};

module.exports = () => {
  shipsField = Array(10)
    .fill(' ')
    .map(() => new Array(10).fill(-1));
  let steps = 0;
  Object.values(SHIPS)
    .sort((a, b) => a.amount - b.amount)
    .map(({ size, amount }) => {
      shipAmount = amount;
      while (shipAmount > 0) {
        const isHorizontal = horizontalOrVertical();
        let { y, x } = randomCoordinates(size, isHorizontal);

        let coordinate = shipsField[y][x];

        while (coordinate !== MARK.empty) {
          const newPosition = randomCoordinates(size, isHorizontal);
          if (shipsField[newPosition.y][newPosition.x] === MARK.empty) {
            x = newPosition.x;
            y = newPosition.y;
          } else {
            const newPosition = randomCoordinates(size, isHorizontal);
            coordinate = shipsField[newPosition.y][newPosition.x];
            x = newPosition.x;
            y = newPosition.y;
          }
        }
        applyShipOnField(isHorizontal, size, y, x);
      }
    });

  shipsField.forEach((row, y) => {
    row.forEach((item, x) => {
      item === MARK.new && steps++;
      if (item === MARK.notAvailable) {
        shipsField[y][x] = MARK.empty;
      }
    });
  });

  return { result: shipsField, steps };
};
