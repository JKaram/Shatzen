import { User, USER_COLOURS } from "./types";

export const users: User[] = [];

export function chooseUserColour() {
  const randomIndex = Math.floor(Math.random() * USER_COLOURS.length);
  return USER_COLOURS[randomIndex];
}

export function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

export function userJoin(id, name, room) {
  const userColour = chooseUserColour();
  users.push({ id, name, room, estimate: null, colour: userColour });
  return { id, name, room, estimate: null, colour: userColour } as User;
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
