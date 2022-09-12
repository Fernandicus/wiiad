import AdDescription from "./AdDescription";
import AdImage from "./AdImage";
import AdRedirectionUrl from "./AdRedirectionUrl";
import AdTitle from "./AdTitle";

export class Advertise {
  private constructor(
    private title: AdTitle,
    private description: AdDescription,
    private image: AdImage,
    private redirectionUrl: AdRedirectionUrl
  ) {}

  static new(
    title: AdTitle,
    description: AdDescription,
    image: AdImage,
    redirectionUrl: AdRedirectionUrl
  ): Advertise {
    return new Advertise(title, description, image, redirectionUrl);
  }
}
