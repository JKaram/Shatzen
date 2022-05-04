import { findIndex } from "lodash";
import { Estimate } from "./estimates";
import { Status } from "./status";
import { User } from "./users";

type Room = { name: string; users: User[]; estimates: Estimate[]; status: Status };

export const rooms: Room[] = [
  { name: "puretest", users: [], estimates: [], status: "estimating" },
  { name: "mars", users: [], estimates: [], status: "estimating" },
];

export const addRoom = (roomName: string) =>
  rooms.push({ name: roomName, users: [], estimates: [], status: "estimating" });

export const findRoom = (roomName: string) => rooms.find((room) => room.name === roomName);
export const findRoomIndex = (roomName: string) => rooms.findIndex((room) => room.name === roomName);

export const addUserToRoom = (roomName, user) => {
  const indexOfRoom = findIndex(rooms, { name: roomName });
  if (indexOfRoom < 0) return console.log("Room not found, addUserToRoom");
  if (rooms[indexOfRoom].users.find((userInRoom) => userInRoom.id === user.id))
    return console.log("User already in Room");
  rooms[indexOfRoom].users.push(user);
};

export const removeUserFromRoom = (user: User) => {
  const indexOfRoom = findIndex(rooms, { name: user.room });
  if (indexOfRoom < 0) return console.log("Room not found, removeUserFromRoom ");
  const indexOfUser = findIndex(rooms[indexOfRoom].users, { id: user.id });
  rooms[indexOfRoom].users.splice(indexOfUser, 1);
};

export const addUserEstimate = (roomName, estimate: Estimate) => {
  const indexOfRoom = findIndex(rooms, { name: roomName });

  if (indexOfRoom < 0) return console.log("Room not found, addUserEstimate");

  const hasEstimatedIndex = findIndex(rooms[indexOfRoom].estimates, { id: estimate.id });

  // * If user has estimated and its the same estimate remove it (toggle).
  // * Else replace the original estimate with the new one
  if (hasEstimatedIndex >= 0) {
    if (rooms[indexOfRoom].estimates[hasEstimatedIndex].estimate === estimate.estimate) {
      return rooms[indexOfRoom].estimates.splice(hasEstimatedIndex, 1);
    }
    return (rooms[indexOfRoom].estimates[hasEstimatedIndex].estimate = estimate.estimate);
  }

  rooms[indexOfRoom].estimates.push(estimate);
};

export const changeRoomStatus = (roomName, status) => {
  const indexOfRoom = findRoomIndex(roomName);
  if (indexOfRoom < 0) return console.log("Room not found, changeRoomStatus");
  rooms[indexOfRoom].status = status;
};

export const clearRoomEstimates = (roomName) => {
  const indexOfRoom = findIndex(rooms, { name: roomName });
  if (indexOfRoom < 0) return console.log("Room not found, clearRoomEstimates");

  rooms[indexOfRoom].estimates.splice(0, rooms[indexOfRoom].estimates.length);
};

export const removeUserEstimate = (user: User) => {
  const roomIndex = findRoomIndex(user.room);
  if (roomIndex === -1) return console.log("Could not remove estimate, room index not found");

  rooms[roomIndex].estimates.splice(
    rooms[roomIndex].estimates.findIndex((estimate) => estimate.id === user.id),
    1
  );
};
