import { Room } from "./types";
import { clearUserEstimates, users } from "./users";

export const rooms: Room[] = [];

export function roomIndex(id) {
  return rooms.map((room) => room.id).indexOf(id);
}

export function createRoom(id: string) {
  rooms.push({ id, average: -1, status: "estimating" });
}

export function roomAverage(id) {
  const room = rooms[roomIndex(id)];

  const realEstimates = users
    .filter(
      (user) => user.room === id && user.estimate !== null && user.estimate > 0
    )
    .map((user) => user.estimate);

  const average =
    realEstimates.reduce((a, b) => a + b, 0) / realEstimates.length;

  rooms[roomIndex(id)] = { ...room, average: average };

  return average;
}

export function isNewRoom(id: string) {
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
