import AdDescription from "@/lib/ad/domain/ValueObjects/AdDescription";
import AdImage from "@/lib/ad/domain/ValueObjects/AdImage";
import AdRedirectionUrl from "@/lib/ad/domain/ValueObjects/AdRedirectionUrl";
import AdTitle from "@/lib/ad/domain/ValueObjects/AdTitle";
import { Ad, AdProps } from "@/lib/ad/domain/Ad";
import { faker } from "@faker-js/faker";
import { AdConstants } from "@/lib/ad/ad-constants";

export default class AdFake extends Ad {
  
  constructor({
    title,
    description,
    image,
    redirectionUrl,
  }: AdProps) {
    super({ title, description, image, redirectionUrl });
  }

  static createRandom(): Ad {
    const fakeTitle = faker.commerce.productName().substring(0, AdConstants.titleMaxLength);
    const fakeDescription = faker.commerce.productDescription().substring(0, AdConstants.descriptionMaxLength);

    const title = new AdTitle(fakeTitle);
    const description = new AdDescription(fakeDescription);
    const image = new AdImage(faker.image.avatar());
    const redirectionUrl = new AdRedirectionUrl(faker.internet.url());

    return new AdFake({ title, description, image, redirectionUrl });
  }

  static empty(): Ad {
    const title = new AdTitle("");
    const description = new AdDescription("");
    const image = new AdImage("");
    const redirectionUrl = new AdRedirectionUrl("");

    return new AdFake({ title, description, image, redirectionUrl });
  }
}
