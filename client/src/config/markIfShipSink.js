import { FIELD_SIZE, MARK, SHIP_TYPE } from './boardParams';

const temporaryMark = 22;
export const shipsAmount = { one: 4, two: 3, three: 2, four: 1 };

const markDot = (row, column, field) => {
  return (field[row][column] = MARK.miss);
};
const verticalLoop = (row, column, size, field) => {
  for (let i = 0; i < size; i++) {
    markDot(row + i, column, field);
  }
  if (row > 0) {
    markDot(row - 1, column, field);
  }
  if (row + size < FIELD_SIZE) {
    markDot(row + size, column, field);
  }
};

const horizontalLoop = (row, column, size, field) => {
  for (let i = 0; i < size; i++) {
    markDot(row, column + i, field);
  }
  if (column > 0) {
    markDot(row, column - 1, field);
  }
  if (column + size < FIELD_SIZE) {
    markDot(row, column + size, field);
  }
};

const fieldsAround = (row, column, size, isHorizontal, field) => {
  if (isHorizontal) {
    if (row > 0) {
      horizontalLoop(row - 1, column, size, field);
    }
    if (row < FIELD_SIZE - 1) {
      horizontalLoop(row + 1, column, size, field);
    }
    if (column > 0) {
      markDot(row, column - 1, field);
    }
    if (column + size < FIELD_SIZE) {
      markDot(row, column + size, field);
    }
  } else {
    if (column > 0) {
      verticalLoop(row, column - 1, size, field);
    }
    if (column < FIELD_SIZE - 1) {
      verticalLoop(row, column + 1, size, field);
    }
    if (row > 0) {
      markDot(row - 1, column, field);
    }
    if (row + size < FIELD_SIZE) {
      markDot(row + size, column, field);
    }
  }
};

const oneFieldShip = (row, column, field) => {
  if (row > 0) {
    markDot(row - 1, column, field);
    if (column > 0) {
      markDot(row - 1, column - 1, field);
    }
    if (column + 1 < FIELD_SIZE) {
      markDot(row - 1, column + 1, field);
    }
  }
  if (column > 0) {
    markDot(row, column - 1, field);
  }
  if (row < FIELD_SIZE - 1) {
    markDot(row + 1, column, field);
    if (column > 0) {
      markDot(row + 1, column - 1, field);
    }
    if (column + 1 < FIELD_SIZE) {
      markDot(row + 1, column + 1, field);
    }
  }
  if (column < FIELD_SIZE - 1) {
    markDot(row, column + 1, field);
  }
};

const horizontalShip = (y, x, shipsField, field, isCount) => {
  shipsField[y][x + 1] = temporaryMark;

  if (
    x + 1 === FIELD_SIZE - 1 ||
    field[y][x + SHIP_TYPE.TWO] === MARK.notAvailable
  ) {
    isCount && (shipsAmount.two -= 1);
    return fieldsAround(y, x, SHIP_TYPE.TWO, true, shipsField);
  }
  if (
    x + SHIP_TYPE.TWO < FIELD_SIZE &&
    shipsField[y][x + SHIP_TYPE.TWO] === MARK.hit
  ) {
    shipsField[y][x + SHIP_TYPE.TWO] = temporaryMark;
    if (
      x + SHIP_TYPE.TWO === FIELD_SIZE - 1 ||
      (x + SHIP_TYPE.THREE < FIELD_SIZE &&
        field[y][x + SHIP_TYPE.THREE] === MARK.notAvailable)
    ) {
      isCount && (shipsAmount.three -= 1);
      return fieldsAround(y, x, SHIP_TYPE.THREE, true, shipsField);
    } else if (
      x + SHIP_TYPE.THREE < FIELD_SIZE &&
      shipsField[y][x + SHIP_TYPE.THREE] === MARK.hit
    ) {
      shipsField[y][x + SHIP_TYPE.THREE] = temporaryMark;
      isCount && (shipsAmount.four -= 1);
      return fieldsAround(y, x, SHIP_TYPE.FOUR, true, shipsField);
    }
  }
};

const verticalShip = (y, x, shipsField, field, isCount) => {
  shipsField[y + 1][x] = temporaryMark;

  if (
    y + 1 === FIELD_SIZE - 1 ||
    field[y + SHIP_TYPE.TWO][x] === MARK.notAvailable
  ) {
    isCount && (shipsAmount.two -= 1);
    return fieldsAround(y, x, SHIP_TYPE.TWO, false, shipsField);
  }

  if (
    y + SHIP_TYPE.TWO < FIELD_SIZE &&
    shipsField[y + SHIP_TYPE.TWO][x] === MARK.hit
  ) {
    shipsField[y + SHIP_TYPE.TWO][x] = temporaryMark;
    if (
      y + SHIP_TYPE.TWO === FIELD_SIZE - 1 ||
      (y + SHIP_TYPE.THREE < FIELD_SIZE &&
        field[y + SHIP_TYPE.THREE][x] === MARK.notAvailable)
    ) {
      isCount && (shipsAmount.three -= 1);
      return fieldsAround(y, x, SHIP_TYPE.THREE, false, shipsField);
    } else if (
      y + SHIP_TYPE.THREE < FIELD_SIZE &&
      shipsField[y + SHIP_TYPE.THREE][x] === MARK.hit
    ) {
      shipsField[y + SHIP_TYPE.THREE][x] = temporaryMark;
      isCount && (shipsAmount.four -= 1);
      return fieldsAround(y, x, SHIP_TYPE.FOUR, false, shipsField);
    }
  }
};

export const markIfShipSink = (field, modifiedField, isCount) => {
  modifiedField.forEach((row, y) => {
    row.forEach((unit, x) => {
      if (unit === MARK.hit) {
        modifiedField[y][x] = temporaryMark;

        if (
          (!x || field[y][x - 1] === MARK.notAvailable) &&
          (x === FIELD_SIZE - 1 || field[y][x + 1] === MARK.notAvailable) &&
          (!y || field[y - 1][x] === MARK.notAvailable) &&
          (y === FIELD_SIZE - 1 || field[y + 1][x] === MARK.notAvailable)
        ) {
          isCount && (shipsAmount.one -= 1);
          oneFieldShip(y, x, modifiedField, field);
        } else if (
          y < FIELD_SIZE - 1 &&
          modifiedField[y + 1][x] === MARK.hit &&
          (!y || field[y - 1][x] !== MARK.ship)
        ) {
          verticalShip(y, x, modifiedField, field, isCount);
        } else if (
          x < FIELD_SIZE - 1 &&
          modifiedField[y][x + 1] === MARK.hit &&
          (!x || field[y][x - 1] !== MARK.ship)
        ) {
          horizontalShip(y, x, modifiedField, field, isCount);
        }
      }
    });
  });

  modifiedField.forEach((row, y) => {
    row.forEach((unit, x) => {
      if (unit === temporaryMark) {
        modifiedField[y][x] = MARK.hit;
      }
    });
  });

  return modifiedField;
};
