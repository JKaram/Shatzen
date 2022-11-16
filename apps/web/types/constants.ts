export const POSSIBLE_ESTIMATES = [
  -4, -3, -2, -1, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100,
] as const;

export const numberToNewValue = (estimate: number) =>
  ({
    "-4": "❌",
    "-3": "☕",
    "-2": "∞",
    "-1": "?",
    "0.5": "½",
  }[estimate.toString()] || estimate);

export const valueDescriptions = {
  "-4": "Abstain from voting.",
  "-3": "Coffee break, I think this needs more discussion.",
  "-2": "This will take a lonnnng time",
  "-1": "I have no idea.",
};

export const ROOM_STRING_SIZE = 4;

export const USER_NAME_SIZE = 12;
export const USER_STRING_MIN_SIZE = 1;

export const USER_COLOURS = [
  "#F0D95F",
  "#D8FFCA",
  "#CAFCFF",
  "#F09C5F",
  "#FFCAEA",
  "#CBCAFF",
  "#FF5B5B",
  "#5B93FF",
] as const;
