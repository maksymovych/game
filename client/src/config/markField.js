import { MARK } from './boardParams';

export const markPointToField = (y, x, prevField, newField) => {
  if (prevField[y][x] === MARK.ship) {
    newField[y][x] = MARK.hit;
  } else {
    newField[y][x] = MARK.miss;
  }
  return newField;
};

export const newField = (field) => field.map((row) => [...row]);

export const markNewStepOnField = (ownSteps, y, x) => {
  const newOwnField = newField(ownSteps);
  return markPointToField(y, x, ownSteps, newOwnField);
};

export const markNewStepsArray = (ownSteps, opponentSteps) => {
  let newOwnField = newField(ownSteps);

  opponentSteps.forEach(({ y, x }) => {
    newOwnField = markPointToField(y, x, ownSteps, newOwnField);
  });
  return newOwnField;
};
