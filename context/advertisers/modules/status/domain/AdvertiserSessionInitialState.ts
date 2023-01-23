import { IAdvertiserSessionState } from "./interfaces/IAdvertiserSessionAction";
import { IAdvertiserStatusState } from "./interfaces/IAdvertiserStatusAction";

interface IAdvertiserSS
  extends IAdvertiserSessionState,
    IAdvertiserStatusState {}

export const advertiserSessionInitialState: IAdvertiserSS = {
  status: "non-init",
  session: {
    email: "",
    id: "",
    name: "",
    profilePic: "",
    role: "",
  },
};
