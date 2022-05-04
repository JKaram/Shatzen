import { Socket } from "socket.io";
import { claculateAverage } from "./estimates";
import {
  addUserEstimate,
  addUserToRoom,
  changeRoomStatus,
  clearRoomEstimates,
  findRoom,
  removeUserEstimate,
  removeUserFromRoom,
} from "./rooms";
import { Status } from "./status";
import { addUser, removeUser, findUser } from "./users";

const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Shatzen");
});

const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  // const usersCurrentRoom = getRoom(roomName);

  // io.emit("estimates", usersCurrentRoom.estimates);
  // io.emit("users", usersCurrentRoom.users);
  // io.emit("status", usersCurrentRoom.status);
  // io.emit("reveal", claculateAverage(usersCurrentRoom.estimates));

  socket.on("add_user", (params: [string, string]) => {
    const [userName, roomName] = params;
    addUser({ name: userName, id: socket.id, room: roomName });
    addUserToRoom(roomName, { name: userName, id: socket.id });

    io.emit("estimates", findRoom(roomName).estimates);
    io.emit("join_room", roomName);
    io.emit("status", findRoom(roomName).status);
    io.emit("users", findRoom(roomName).users);
  });

  socket.on("add_estimate", (estimate: number) => {
    const user = findUser(socket.id);

    if (!user) return console.log("Could not add estimate, user not found");

    addUserEstimate(user.room, { estimate: estimate, id: socket.id });

    const updatedRoom = findRoom(user.room);

    io.emit("estimates", updatedRoom.estimates);
    io.emit("status", updatedRoom.status);
    io.emit("users", updatedRoom.users);
  });

  socket.on("change_room_status", (status: Status) => {
    const user = findUser(socket.id);

    if (!user) return console.log("Could not change room status, user not cfound");

    changeRoomStatus(user.room, status);

    if (status === "estimating") {
      clearRoomEstimates(user.room);
    }

    const updatedRoom = findRoom(user.room);

    io.emit("estimates", updatedRoom.estimates);
    io.emit("reveal", claculateAverage(updatedRoom.estimates));
    io.emit("status", updatedRoom.status);
    io.emit("users", updatedRoom.users);
  });

  socket.on("disconnect", (reason) => {
    console.log("Disconnect", reason);

    const user = findUser(socket.id);

    if (!user) return console.log("Could not disconnect user, user not found");

    removeUser(user);
    removeUserEstimate(user);
    removeUserFromRoom(user);

    const updatedRoom = findRoom(user.room);

    io.emit("estimates", updatedRoom.estimates);
    io.emit("status", updatedRoom.status);
    io.emit("users", updatedRoom.users);
  });
});

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});
