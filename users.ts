import { findIndex } from "lodash";

export const allUsers: User[] = [];

export type User = {
  id: string;
  name: string;
  room: string;
};

export const addUser = (newUser: User) => {
  const doesUserExist = allUsers.find((user) => user.id === newUser.id);
  if (doesUserExist) return console.log("User already exists");
  allUsers.push(newUser);
};

export const findUser = (id: string) => {
  const foundUser = allUsers.find((user) => user.id === id);

  if (!foundUser) {
    console.log("Could not find User");
    return undefined;
  }

  return foundUser;
};

export const removeUser = (user: User) => {
  const indexOfUser = findIndex(allUsers, { id: user.id });
  allUsers.splice(indexOfUser, 1);
};
