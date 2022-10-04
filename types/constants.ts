export const possibleEstimates = [-1, 0.5, 1, 2, 3, 5, 8, 13];

export const numberToNewValue = (estimate: number) =>
  ({
    "-1": "?",
  }[estimate.toString()]);

export const ROOM_STRING_SIZE = 4;
