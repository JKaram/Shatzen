import { USER_COLOURS } from "../types";

export function chooseUserColour() {
  const randomIndex = Math.floor(Math.random() * USER_COLOURS.length);
  return USER_COLOURS[randomIndex];
}
