export class ErrorCreatingAd extends Error {
  readonly info;
  constructor(info: string, errorMessage?: string) {
    super(errorMessage);
    this.info = info;
  }
}
