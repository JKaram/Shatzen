import { Socket } from "socket.io";
import { changeStatus, createRoom, isNewRoom, userRoom } from "./rooms";
import { addEstimate, userJoin, allRoomUsers, userLeave, getCurrentUser } from "./users";

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
  socket.on("userJoin", ({ name, room }) => {
    const user = userJoin(socket.id, name, room);
    socket.join(user.room);

    if (isNewRoom(user.room)) {
      createRoom(user.room);
    }
    console.log(allRoomUsers(user.room));

    io.to(user.room).emit("users", allRoomUsers(user.room));
    io.to(socket.id).emit("roomStatus", userRoom(user.room).status);
  });

  socket.on("estimate", ({ estimate, room }) => {
    addEstimate(socket.id, estimate);

    io.to(room).emit("users", allRoomUsers(room));
  });

  socket.on("changeStatus", ({ status }) => {
    const user = getCurrentUser(socket.id);

    changeStatus(user.room, status);

    io.to(user.room).emit("roomStatus", userRoom(user.room).status);
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    io.to(user.room).emit("users", allRoomUsers(user.room));
  });
});

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});
