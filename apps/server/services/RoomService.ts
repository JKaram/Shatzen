import { Server, Socket } from "socket.io";
import {
  EmitFunction,
  SocketIncomingEvents,
  SocketOutgoingEvents,
} from "../types";
import { Room, User } from "../types";
import { chooseUserColour } from "../utils/chooseUserColour";

class RoomService {
  private maxUsers = 0;
  private store: Set<string> & { users: Record<string, User>; room: Room };

  constructor(
    private io: Server<SocketIncomingEvents, SocketOutgoingEvents>,
    private socket: Socket<SocketIncomingEvents, SocketOutgoingEvents>,
    private roomId: string,
    private username: string
  ) {}

  async init() {
    const clients = await this.io.in(this.roomId).fetchSockets();
    if (!clients) console.error(`INTERNAL ERROR - Room creation failed`);

    await this.socket.join(this.roomId);
    // Next line returns a set, which we mutate with users and room data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.store = this.io.of("/").adapter.rooms.get(this.roomId) as any;

    const user: User = {
      colour: chooseUserColour(),
      estimate: null,
      id: this.socket.id,
      name: this.username,
    };
    if (clients.length === 0) {
      this.store.users = {
        [this.socket.id]: user,
      };
      this.store.room = {
        id: this.roomId,
        average: -1,
        status: "estimating",
      };
      this.addToMax();
      return true;
    }
    this.store.users[this.socket.id] = user;
    this.addToMax();
    return true;
  }

  // Emitters

  emitUsers() {
    this.emitToRoom("users", [this.store.users]);
  }
  emitStatus(toSelf?: boolean) {
    this.emit("roomStatus", [this.store.room.status], toSelf);
  }
  emitAverage(toSelf?: boolean) {
    this.emit("average", [this.store.room.average], toSelf);
  }
  emitFirstConnect() {
    this.emitToSelf("firstConnect", [this.roomId]);
  }

  // Listeners

  onChangeStatus() {
    this.socket.on("changeStatus", ({ status }) => {
      this.store.room.status = status;

      let totalCount = 0;
      const total = Object.values(
        this.store.users as Record<string, User>
      ).reduce<number>((acc, cur) => {
        if (!cur.estimate || cur.estimate <= 0) return acc;
        totalCount += 1;
        return acc + cur.estimate;
      }, 0);
      this.store.room.average = total / totalCount;

      if (status === "revealing") {
        this.emitAverage();
      } else {
        this.clearEstimates();
      }
      this.emitStatus();
      this.emitUsers();
    });
  }

  onRemoveUser() {
    this.socket.on("removeUser", () => {
      delete this.store.users[this.socket.id];
      this.emitUsers();
    });
  }

  onEstimate() {
    this.socket.on("estimate", ({ estimate }) => {
      // Toggle estimate if user clicks on same value
      if (this.store.users[this.socket.id].estimate === estimate) {
        this.store.users[this.socket.id].estimate = null;
      } else {
        this.store.users[this.socket.id].estimate = estimate;
      }
      this.emitUsers();
    });
  }

  private clearEstimates() {
    const keys = Object.keys(this.store.users);
    keys.forEach((key) => {
      this.store.users[key].estimate = null;
    });
  }

  private emit: EmitFunction = (message, data, toSelf) => {
    if (toSelf) {
      this.emitToSelf(message, data);
      return;
    }
    this.emitToRoom(message, data);
  };

  private emitToSelf: EmitFunction = (message, data) => {
    this.io.to(this.socket.id).emit(message, ...data);
  };

  private emitToRoom: EmitFunction = (message, data) => {
    this.io.to(this.roomId).emit(message, ...data);
  };

  onDisconnect() {
    this.socket.on("disconnect", () => {
      try {
        delete this.store.users[this.socket.id];
        this.emitUsers();
      } catch (error) {
        console.error(error);
      }
      console.log("Client disconnected");
    });
  }

  private addToMax() {
    // TODO use for metrics
    if (Object.values(this.store.users).length === this.maxUsers)
      this.maxUsers += 1;
  }
}

export default RoomService;
