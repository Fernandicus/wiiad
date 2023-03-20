export type WebSocketChannels = "watch-ad";

export class WebSocketChannel {
  readonly name;

  private constructor(value: string) {
    if (!value.includes("private-"))
      throw new Error("Pusher Channels must be private");
    if (!value.includes("-channel@"))
      throw new Error("Pusher Channels must be private");
    this.name = value;
  }

  static private(name: WebSocketChannels) {
    return new WebSocketChannel("private-channel@" + name);
  }

  static watchAd() {
    return WebSocketChannel.private("watch-ad");
  }
}
