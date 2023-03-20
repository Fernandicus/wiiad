
export type WebSocketEvent = "finish-watching-ad"

export class WebSocketEventName {
  readonly name;

  private constructor(value: string) {
    if (!value.includes("event::"))
      throw new Error("Event Name must be start with 'event::'");
    this.name = value;
  }

  static new(name: WebSocketEvent) {
    return new WebSocketEventName("event::" + name);
  }

  static finishWatchingAd() {
    return WebSocketEventName.new("finish-watching-ad");
  }
}
