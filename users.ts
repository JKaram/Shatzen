import { findIndex } from "lodash";
import { removeUserEstimate } from "./estimates";

export const users: User[] = [];

type User = {
  id: string;
  name: string;
};

export const addUser = (newUser: User) => {
  const doesUserExist = users.find((user) => user.id === newUser.id);
  if (doesUserExist) return;
  users.push(newUser);
};

export const removeUser = (id: string) => {
  const indexOfUser = findIndex(users, { id: id });
  removeUserEstimate(id);
  users.splice(indexOfUser, 1);
};

export const removeAllUsers = () => users.splice(0, users.length);
