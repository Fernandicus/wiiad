import { UniqId } from "@/src/utils/UniqId";
import { PusherWSSId } from "../../domain/PusherWSSId";
import { AuthUserWSS } from "../AuthUserWSS";

export class AuthUserWSSHandler {
  constructor(private authUserSocket: AuthUserWSS) {}

  auth(props: {
    socketId: string;
    userId: string;
    onAuth: (data: unknown) => void;
  }): void {
    this.authUserSocket.auth({
      userId: new UniqId(props.userId),
      socketId: new PusherWSSId(props.socketId),
      onAuth: props.onAuth,
    });
  }
}
