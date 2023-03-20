export class ErrorWebSocket extends Error {
  constructor(message: string) {
    super(message);
  }

  static disconnecting(error?: string) {
    return new ErrorWebSocket(
      `Something went wrong disconnecting websocket: ${error}`
    );
  }
}
