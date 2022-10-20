import { Server, Socket } from "socket.io";
import { User } from "../types";
import { chooseUserColour } from "../utils";

class Room {
  private store: any;
  private maxUsers = 0;

  constructor(
    private io: Server,
    private socket: Socket,
    private roomId: string,
    private username: string
  ) {
    this.store = io.of("/").adapter;
  }

  async init() {
    const clients = await this.io.in(this.roomId).fetchSockets();
    if (!clients) console.error(`INTERNAL ERROR - Room creation failed`);

    await this.socket.join(this.roomId);
    this.store = this.store.rooms.get(this.roomId);

    const user = {
      id: this.socket.id,
      name: this.username,
      roomId: this.roomId,
      estimate: null,
      colour: chooseUserColour(),
    };
    if (clients.length === 0) {
      this.store.users = {
        [this.socket.id]: user,
      };
      this.store.room = {
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
    this.emitToRoom("users", this.store.users);
  }
  emitStatus(toSelf?: boolean) {
    this.emit("roomStatus", this.store.room.status, toSelf);
  }
  emitAverage(toSelf?: boolean) {
    this.emit("average", this.store.room.average, toSelf);
  }
  emitFirstConnect() {
    this.emitToSelf("firstConnect", this.roomId);
  }

  // Listeners

  onChangeStatus() {
    this.socket.on(
      "changeStatus",
      ({ status }: { status: "revealing" | "estimating" }) => {
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
      }
    );
  }

  onRemoveUser() {
    this.socket.on("removeUser", () => {
      delete this.store.users[this.socket.id];
      this.emitUsers();
    });
  }

  onEstimate() {
    this.socket.on("estimate", ({ estimate }: { estimate: number }) => {
      this.store.users[this.socket.id].estimate = estimate;
      this.emitUsers();
    });
  }

  private clearEstimates() {
    const keys = Object.keys(this.store.users);
    keys.forEach((key) => {
      this.store.users[key].estimate = null;
    });
  }

  private emit(message: string, data: any, toSelf?: boolean) {
    this[toSelf ? "emitToSelf" : "emitToRoom"](message, data);
  }

  private emitToSelf(message: string, data: any) {
    this.io.to(this.socket.id).emit(message, data);
  }

  private emitToRoom(message: string, data: any) {
    this.io.to(this.roomId).emit(message, data);
  }

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
    if (this.store.users.length === this.maxUsers) this.maxUsers += 1;
  }
}

export default Room;
