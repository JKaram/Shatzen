import { User } from "./types";

export const users: User[] = [];

export function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

export function userJoin(id, name, room) {
  const user = { id, name, room };
  users.push({ id, name, room, estimate: null });
  return user;
}

export function allRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

export function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  const disconnectingUser = users[index];

  if (index !== -1) {
    users.splice(index, 1);
  }
  return disconnectingUser;
}

export function addEstimate(id, estimate) {
  const index = users.findIndex((user) => user.id === id);

  if (users[index].estimate === estimate) {
    return (users[index] = { ...users[index], estimate: null });
  }

  users[index] = { ...users[index], estimate };
}

export function clearUserEstimates(roomId) {
  for (const user in users) {
    if (users[user].room === roomId) {
      users[user].estimate = null;
    }
  }
}
