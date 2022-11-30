
export class AdRedirectionUrl {
  public readonly url;
  constructor(url: string) {
    if (url.length == 0) {
      throw new Error("Ad url is mandatory");
    }
    this.url = url;
  }
}
