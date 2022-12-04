import type { Express } from "express";
import type { Server } from "http";
import type { Collection } from "mongodb";
import { Server as SocketServer } from "socket.io";
import { createAdapter } from "@socket.io/mongo-adapter";
import RoomService from "../services/RoomService";
import type { SocketIncomingEvents, SocketOutgoingEvents } from "../types";

export type SocketLoaderArgs = {
  app: Express;
  server: Server;
  mongoCollection: Collection;
};

const socketLoader = async ({
  app,
  server,
  mongoCollection,
}: SocketLoaderArgs) => {
  const io = new SocketServer<SocketIncomingEvents, SocketOutgoingEvents>(
    server,
    {
      cors: {
        origin: "*",
      },
    }
  );
  io.adapter(createAdapter(mongoCollection));

  io.on("connection", async (socket) => {
    socket.on("userJoin", async ({ user, room: roomId, config }) => {
      const room = new RoomService(
        io,
        socket,
        roomId.toLowerCase(),
        user.name,
        config,
        user.colour,
        user.pattern
      );
      const success = await room.init();
      if (success) {
        room.emitUsers();
        room.emitStatus(true);
        room.emitCalculations(true);
        room.emitFirstConnect();
        room.emitConfig();

        room.onUpdateConfig();
        room.onChangeStatus();
        room.onEstimate();
        room.onRemoveUser();
      }
      room.onDisconnect();
    });
  });

  app.get("/rooms/count", (_req, res) => {
    res.json({ roomCount: io.of("/").adapter.rooms.size });
  });
};

export default socketLoader;
