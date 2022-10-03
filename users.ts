export const users = [];

export type User = {
  id: string;
  username: string;
  room: string;
};

export function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

export function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push({ id, username, room, estimate: null });
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

  if (users[index].estimate === estimate) users[index] = { ...users[index], estimate: null };

  users[index] = { ...users[index], estimate };
}

export function clearUserEstimates(roomId) {
  console.log("🚀 ~ file: users.ts ~ line 42 ~ clearUserEstimates ~ roomId", roomId);
  for (const user in users) {
    if (users[user].room === roomId) {
      users[user].estimate = null;
    }
  }
}
