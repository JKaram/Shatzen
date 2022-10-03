import { findIndex } from "lodash";
import { Estimate } from "./estimates";
import { Status } from "./status";
import { User } from "./users";

type Room = { name: string; users: User[]; estimates: Estimate[]; status: Status };

// export const rooms: Room[] = hardcodedRooms.map((room) => ({
//   name: room,
//   users: [],
//   estimates: [],
//   status: "estimating",
// }));

export const rooms = [];

export function roomIndex(id) {
  return rooms.indexOf((room) => room.id === id);
}

export function createRoom(id) {
  rooms.push({ id, status: "estimating" });
}

export function isNewRoom(id) {
  return !rooms.includes((room) => room.id === id);
}

export function userRoom(id) {
  return rooms.find((room) => room.id === id);
}

export function changeStatus(id, newStatus) {
  const index = roomIndex(id);

  rooms[index] = { ...rooms[index], status: newStatus };
}
