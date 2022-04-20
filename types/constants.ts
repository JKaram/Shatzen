export const possibleEstimates = [-1, 0, 1, 2, 3, 5, 8, 13];

export const numberToNewValue = (estimate: number) =>
  ({
    "0": "☕",
    "-1": "?",
  }[estimate.toString()]);
