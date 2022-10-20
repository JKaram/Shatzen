export const possibleEstimates = [-1, 0.5, 1, 2, 3, 5, 8, 13];

export const numberToNewValue = (estimate: number) =>
  ({
    "-1": "?",
  }[estimate.toString()]);

export const ROOM_STRING_SIZE = 4;

export const USER_NAME_SIZE = 12;
export const USER_STRING_MIN_SIZE = 1;

export const USER_COLOURS = [
  "#F0D95F",
  "#D8FFCA",
  "#CAFCFF",
  "#F09C5F",
  "#FFCAEA",
] as const;
