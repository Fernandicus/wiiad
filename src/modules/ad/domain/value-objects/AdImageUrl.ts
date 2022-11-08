import { ErrorCreatingAd } from "../ErrorCreatingAd";

export class AdImageUrl {
  public readonly image;
  
  constructor(imageUrl: string) {
    
    if (!imageUrl)
      throw new ErrorCreatingAd("Ad image is mandatory");

    this.image = imageUrl;
  }
}
