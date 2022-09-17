export class ErrorCreatingAd extends Error {
  readonly info;
  constructor(info: string, message?: string) {
    super(message);
    this.info = info;
  }
}
