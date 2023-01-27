import { IAdvertiserState } from "./interfaces/IAdvertiserState";

export const advertiserInitialState: IAdvertiserState = {
  status: "non-init",
  session: {
    email: "",
    id: "",
    name: "",
    profilePic: "",
    role: "",
  },
};
