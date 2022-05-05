const { MARK, SHIPS_SIZES, FIELD_SIZE } = require('./constants/gameConstants');

module.exports = (shipsField) => {
  const result = ['error'];
  const message = 'Ships cant touch each other!!!';
  let shipsAmount = { one: 4, two: 3, three: 2, four: 1 };
  //Amounts of ships
  const shipValidation = () => {
    Object.values(shipsAmount).forEach((amount, i) => {
      if (!!amount) {
        const moreOrLes = amount > 0 ? amount + ' more' : -amount + ' les';
        return result.push(`Ship(s) with length ${++i} need ${moreOrLes}`);
      }
    });
  };

  const markAsUnavailable = (row, column) => {
    if (shipsField[row][column] === 3 || shipsField[row][column] === 4) {
      result.push(message);
    }
    return (shipsField[row][column] = 0);
  };

  const verticalLoop = (row, column, size) => {
    for (let i = 0; i < size; i++) {
      markAsUnavailable(row + i, column);
    }
    if (row > 0) {
      markAsUnavailable(row - 1, column);
    }
    if (row + size < FIELD_SIZE) {
      markAsUnavailable(row + size, column);
    }
  };

  const horizontalLoop = (row, column, size) => {
    for (let i = 0; i < size; i++) {
      markAsUnavailable(row, column + i);
    }
    if (column > 0) {
      markAsUnavailable(row, column - 1);
    }
    if (column + size < FIELD_SIZE) {
      markAsUnavailable(row, column + size);
    }
  };

  const fieldsAround = (row, column, size, isHorizontal) => {
    if (isHorizontal) {
      if (row > 0) {
        horizontalLoop(row - 1, column, size);
      }
      if (row < FIELD_SIZE - 1) {
        horizontalLoop(row + 1, column, size);
      }

      if (column > 0) {
        markAsUnavailable(row, column - 1);
      }
      if (column + size < FIELD_SIZE) {
        markAsUnavailable(row, column + size);
      }
    } else {
      if (column > 0) {
        verticalLoop(row, column - 1, size);
      }
      if (column < FIELD_SIZE - 1) {
        verticalLoop(row, column + 1, size);
      }

      if (row > 0) {
        markAsUnavailable(row - 1, column);
      }

      if (row + size < FIELD_SIZE) {
        markAsUnavailable(row + size, column);
      }
    }
  };

  const horizontalShip = (row, column) => {
    shipsField[row][column] = MARK.ship;
    shipsField[row][column + SHIPS_SIZES.one] = MARK.ship;

    if (
      column + 1 === FIELD_SIZE - 1 ||
      shipsField[row][column + SHIPS_SIZES.two] < 1
    ) {
      shipsAmount.two -= 1;
      return fieldsAround(row, column, SHIPS_SIZES.two, true);
    }
    if (
      column + SHIPS_SIZES.two < FIELD_SIZE &&
      shipsField[row][column + SHIPS_SIZES.two] === MARK.new
    ) {
      shipsField[row][column + SHIPS_SIZES.two] = MARK.ship;
      if (
        column + SHIPS_SIZES.two === FIELD_SIZE - 1 ||
        (column + SHIPS_SIZES.three < FIELD_SIZE &&
          shipsField[row][column + SHIPS_SIZES.three] < 1)
      ) {
        shipsAmount.three -= 1;
        return fieldsAround(row, column, SHIPS_SIZES.three, true);
      }
    }

    if (
      column + SHIPS_SIZES.three < FIELD_SIZE &&
      shipsField[row][column + SHIPS_SIZES.three] === SHIPS_SIZES.four
    ) {
      shipsField[row][column + SHIPS_SIZES.three] = SHIPS_SIZES.three;
      shipsAmount.four -= 1;
      return fieldsAround(row, column, SHIPS_SIZES.four, true);
    }
  };

  const verticalShip = (row, column) => {
    shipsField[row][column] = MARK.ship;
    shipsField[row + 1][column] = MARK.ship;

    if (
      row + 1 === FIELD_SIZE - 1 ||
      shipsField[row + SHIPS_SIZES.two][column] < 1
    ) {
      shipsAmount.two -= 1;
      return fieldsAround(row, column, SHIPS_SIZES.two, false);
    }

    if (
      row + SHIPS_SIZES.two < FIELD_SIZE &&
      shipsField[row + SHIPS_SIZES.two][column] === SHIPS_SIZES.four
    ) {
      shipsField[row + SHIPS_SIZES.two][column] = MARK.ship;
      if (
        row + SHIPS_SIZES.two === FIELD_SIZE - 1 ||
        (row + SHIPS_SIZES.three < FIELD_SIZE &&
          shipsField[row + SHIPS_SIZES.three][column] < 1)
      ) {
        shipsAmount.three -= 1;

        return fieldsAround(row, column, SHIPS_SIZES.three, false);
      }
    }

    if (
      row + SHIPS_SIZES.three < FIELD_SIZE &&
      shipsField[row + SHIPS_SIZES.three][column] === SHIPS_SIZES.four
    ) {
      shipsField[row + SHIPS_SIZES.three][column] = SHIPS_SIZES.three;
      shipsAmount.four -= 1;
      return fieldsAround(row, column, SHIPS_SIZES.four, false);
    }
  };

  const oneFieldShip = (row, column) => {
    shipsAmount.one -= 1;
    if (row > 0) {
      markAsUnavailable(row - 1, column);
      if (column > 0) {
        markAsUnavailable(row - 1, column - 1);
      }
      if (column + 1 < FIELD_SIZE) {
        markAsUnavailable(row - 1, column + 1);
      }
    }
    if (column > 0) {
      markAsUnavailable(row, column - 1);
    }
    if (row < FIELD_SIZE - 1) {
      markAsUnavailable(row + 1, column);
      if (column > 0) {
        markAsUnavailable(row + 1, column - 1);
      }
      if (column + 1 < FIELD_SIZE) {
        markAsUnavailable(row + 1, column + 1);
      }
    }
    if (column < FIELD_SIZE - 1) {
      markAsUnavailable(row, column + 1);
    }
  };

  const isLengthMoreThenFour = (row, column) => {
    if (
      (column + SHIPS_SIZES.four < FIELD_SIZE &&
        shipsField[row][column + 1] === MARK.new &&
        shipsField[row][column + SHIPS_SIZES.two] === MARK.new &&
        shipsField[row][column + SHIPS_SIZES.three] === MARK.new &&
        shipsField[row][column + SHIPS_SIZES.four] === MARK.new) ||
      (row + SHIPS_SIZES.four < FIELD_SIZE &&
        shipsField[row + 1][column] === MARK.new &&
        shipsField[row + SHIPS_SIZES.two][column] === MARK.new &&
        shipsField[row + SHIPS_SIZES.three][column] === MARK.new &&
        shipsField[row + SHIPS_SIZES.four][column] === MARK.new)
    ) {
      result.push(`Ship cant has more then ${SHIPS_SIZES.four} squares length`);
      return true;
    }
    return false;
  };

  shipsField.forEach((row, rowIndex) => {
    row.forEach((field, columnIndex, horizonArray) => {
      if (field !== MARK.new) {
        return;
      }
      shipsField[rowIndex][columnIndex] = MARK.ship;
      //length validation
      if (isLengthMoreThenFour(rowIndex, columnIndex)) {
        return;
      }

      if (
        rowIndex < FIELD_SIZE - 1 &&
        shipsField[rowIndex + 1][columnIndex] === MARK.new
      ) {
        verticalShip(rowIndex, columnIndex);
      } else if (
        columnIndex < FIELD_SIZE - 1 &&
        horizonArray[columnIndex + 1] === MARK.new
      ) {
        horizontalShip(rowIndex, columnIndex);
      } else {
        oneFieldShip(rowIndex, columnIndex);
      }
    });
  });

  shipValidation();

  if (result.length > 1) {
    return result;
  }
  return shipsField;
};
