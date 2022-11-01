import { Server } from "http";
import { Collection } from "mongodb";
import { Server as SocketServer } from "socket.io";
import { createAdapter } from "@socket.io/mongo-adapter";
import RoomService from "../services/RoomService";
import { SocketIncomingEvents, SocketOutgoingEvents } from "../types";

export type SocketLoaderArgs = {
  server: Server;
  mongoCollection: Collection;
};

const socketLoader = async ({ server, mongoCollection }: SocketLoaderArgs) => {
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
    socket.on("userJoin", async ({ name, room: roomId }) => {
      const room = new RoomService(io, socket, roomId, name);
      const success = await room.init();
      if (success) {
        room.emitUsers();
        room.emitStatus(true);
        room.emitAverage(true);
        room.emitFirstConnect();
        room.emitRoomOptions();

        room.onUpdateRoomOptions();
        room.onChangeStatus();
        room.onEstimate();
        room.onRemoveUser();
      }
      room.onDisconnect();
    });
  });
};

export default socketLoader;
