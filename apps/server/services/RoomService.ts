import { Server, Socket } from "socket.io";
import { DEFAULT_POSSIBLE_ESTIMATES } from "../constants";
import {
  Config,
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
    private username: string,
    private config: Config | undefined
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
        calculations: {
          average: -1,
          mode: null,
        },
        status: "estimating",
        possibleEstimates:
          this.config?.possibleEstimates || DEFAULT_POSSIBLE_ESTIMATES,
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
  emitCalculations(toSelf?: boolean) {
    this.emit("calculations", [this.store.room.calculations], toSelf);
  }
  emitFirstConnect() {
    this.emitToSelf("firstConnect", [this.roomId]);
  }
  emitConfig() {
    this.emit("config", [
      { possibleEstimates: this.store.room.possibleEstimates },
    ]);
  }

  // Listeners

  onUpdateConfig() {
    this.socket.on("updateConfig", (options) => {
      this.store.room.possibleEstimates = options.possibleEstimates;

      // Only reset estimates if room is in estimating state
      if (this.store.room.status === "revealing") {
        return this.emitConfig();
      }

      this.clearEstimates();
      this.emitUsers();
      this.emitConfig();
    });
  }

  onChangeStatus() {
    this.socket.on("changeStatus", ({ status }) => {
      this.store.room.status = status;

      let totalCount = 0;
      const modeMap = {};

      const total = Object.values(
        this.store.users as Record<string, User>
      ).reduce<number>((acc, cur) => {
        if (!cur.estimate || cur.estimate <= 0) return acc;
        totalCount += 1;

        if (modeMap[cur.estimate]) {
          modeMap[cur.estimate] += 1;
        } else {
          modeMap[cur.estimate] = 1;
        }

        return acc + cur.estimate;
      }, 0);

      this.store.room.calculations.average = total / totalCount;

      let highestValue = 0;
      let highestValueKey = -Infinity;

      for (const key in modeMap) {
        const value = modeMap[key];
        if (value >= highestValue && Number(key) > highestValueKey) {
          highestValue = value;
          highestValueKey = Number(key);
        }
      }

      this.store.room.calculations.mode = Object.keys(modeMap)
        .filter((mode) => modeMap[mode] === highestValue)
        .map((mode) => Number(mode));

      if (status === "revealing") {
        this.emitCalculations();
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
