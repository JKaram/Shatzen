import { Room } from "./types";
import { clearUserEstimates } from "./users";

export const rooms: Room[] = [];

export function roomIndex(id) {
  return rooms.map((room) => room.id).indexOf(id);
}

export function createRoom(id) {
  rooms.push({ id, status: "estimating" });
}

export function isNewRoom(id) {
  return !rooms.some((room) => room.id === id);
}

export function userRoom(id) {
  return rooms.find((room) => room.id === id);
}

export function changeStatus(id, newStatus) {
  const index = roomIndex(id);

  rooms[index] = { ...rooms[index], status: newStatus };

  if (newStatus === "estimating") {
    clearUserEstimates(rooms[index].id);
  }
}
