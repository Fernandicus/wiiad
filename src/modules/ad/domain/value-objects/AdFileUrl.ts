export class AdFileUrl {
  public readonly file;

  constructor(file: string) {
    if (!file) throw new Error("Ad file is mandatory");

    this.file = file;
  }

  isVideo(): boolean {
    return this.file.includes(".mp4");
  }
}
