import { ErrorCreatingAd } from "../ErrorCreatingAd";

export class AdImageUrl {
  public readonly image;
  
  constructor(imageUrl: string) {
    const httpRegExp = new RegExp(
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    );

    if (!httpRegExp.test(imageUrl))
      throw new ErrorCreatingAd("Ad image is mandatory");

    this.image = imageUrl;
  }
}
