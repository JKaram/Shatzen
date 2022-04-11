import { disconnect } from "process";
import { Socket } from "socket.io";
import { addEstimate, claculateAverage, estimates, removeUserEstimate } from "./estimates";
import { addUser, removeUser, users } from "./users";

const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.send("hello world");
});

const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  io.emit("estimates", estimates);
  io.emit("users", users);

  socket.on("add user", (name) => {
    addUser({ name: name, id: socket.id });
    io.emit("users", users);
  });

  socket.on("remove", () => {
    removeUser(socket.id);
    removeUserEstimate(socket.id);
    io.emit("users", users);
    io.emit("estimates", estimates);
  });

  socket.on("add estimate", (estimate) => {
    addEstimate({ id: socket.id, estimate: estimate });
    io.emit("estimates", estimates);
  });

  socket.on("reveal", () => {
    io.emit("reveal", claculateAverage());
  });

  socket.on("disconnect", (reason) => {
    console.log("Disconnect", reason);
    removeUser(socket.id);
    removeUserEstimate(socket.id);
    io.emit("estimates", estimates);
    io.emit("users", users);
  });
});

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});
