export class ProfilePic {
  readonly url;

  constructor(url: string) {
    if (!url) throw new Error("ProfilePic cant be emptu");
    this.url = url;
  }

  static withDefaultUserPic(): ProfilePic {
    return new ProfilePic(this.defaultUserPic);
  }

  static withDefaultAdvertiserPic(): ProfilePic {
    return new ProfilePic(this.defaultAdvertiserPic);
  }

  static readonly defaultUserPic =
    "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=834&q=80";

  static readonly defaultAdvertiserPic =
    "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1878&q=80";
}
