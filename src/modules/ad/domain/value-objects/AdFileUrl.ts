import { ErrorCreatingAd } from "../errors/ErrorCreatingAd";

export class AdFileUrl {
  public readonly file;
  
  constructor(file: string) {
    
    if (!file)
      throw new ErrorCreatingAd("Ad file is mandatory");

    this.file = file;
  }
}
