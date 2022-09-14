import AdDescription from "./ValueObjects/AdDescription";
import AdImage from "./ValueObjects/AdImage";
import AdRedirectionUrl from "./ValueObjects/AdRedirectionUrl";
import AdTitle from "./ValueObjects/AdTitle";

export interface AdProps {
  title: AdTitle;
  description: AdDescription;
  image: AdImage;
  redirectionUrl: AdRedirectionUrl;
}

export class Ad {
  public readonly title: AdTitle;
  public readonly description: AdDescription;
  public readonly image: AdImage;
  public readonly redirectionUrl: AdRedirectionUrl;

  constructor({ title, description, image, redirectionUrl }: AdProps) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.redirectionUrl = redirectionUrl;
  }
}
