const ALL_WEBSOCKET_EVENTS = [
  "finish-watching-ad",
  "start-watching-ad",
] as const;
type TWebSocketEvents = typeof ALL_WEBSOCKET_EVENTS;
export type TWebSocketEvent = TWebSocketEvents[number];

//export type TWebSocketEvent = "finish-watching-ad";

export class WebSocketEventName {
  readonly event;

  private constructor(value: string) {
    if (!value.includes("event::"))
      throw new Error("Event Name must be start with 'event::'");
    this.event = value;
  }

  static event(name: TWebSocketEvent) {
    return WebSocketEventName.fromString(name);
  }

  static fromString(name: string) {
    return new WebSocketEventName("event::" + name);
  }

  static validateFromString(name: string) {
    if (!this.isValidEvent(name))
      throw new Error(`Event name ${name} is not a valid event`);
    return WebSocketEventName.event(name);
  }

  private static isValidEvent(name: string): name is TWebSocketEvent {
    return ALL_WEBSOCKET_EVENTS.includes(name as TWebSocketEvent);
  }

  getName() {
    return this.event.split("event::")[1];
  }

}