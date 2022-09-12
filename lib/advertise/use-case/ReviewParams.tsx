import AdDescription from "../domain/AdDescription";
import AdImage from "../domain/AdImage";
import AdTitle from "../domain/AdTitle";
import AdRedirectionUrl from "../domain/AdRedirectionUrl";

interface CreateAdRequiredParams {
  title: AdTitle;
  description: AdDescription;
  image: AdImage;
  redirectionUrl: AdRedirectionUrl;
}

export default class ReviewParams {
  static forCreateAd({
    reqBody,
  }: {
    reqBody: {
      title: string;
      description: string;
      image: string;
      redirectionUrl: string;
    };
  }): CreateAdRequiredParams {
    const adTitle: AdTitle = new AdTitle(reqBody.title);
    const adDescription: AdDescription = new AdDescription(reqBody.description);
    const adImage: AdImage = new AdImage(reqBody.image);
    const adRedirectionUrl: AdRedirectionUrl = new AdRedirectionUrl(
      reqBody.redirectionUrl
    );
    return {
      title: adTitle,
      description: adDescription,
      image: adImage,
      redirectionUrl: adRedirectionUrl,
    };
  }
}
