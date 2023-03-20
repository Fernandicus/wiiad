export class PusherWebSocketId {
    readonly id;
  
    constructor(value: string) {
      if (!value.includes("."))
        throw Error("Incorrect Pusher Socket Id value: " + value);
      const values = value.split(".");
      if (!parseInt(values[0]) || !parseInt(values[1]))
        throw Error("Incorrect Pusher Socket Id value: " + value);
      this.id = value;
    }
  }