import AdDescription from "@/src/ad/domain/ValueObjects/AdDescription";
import AdImage from "@/src/ad/domain/ValueObjects/AdImage";
import AdRedirectionUrl from "@/src/ad/domain/ValueObjects/AdRedirectionUrl";
import AdTitle from "@/src/ad/domain/ValueObjects/AdTitle";
import { Ad, AdProps } from "@/src/ad/domain/Ad";
import { faker } from "@faker-js/faker";
import { AdConstants } from "@/src/ad/ad-constants";
import AdvertiserId from "@/src/ad/domain/ValueObjects/AdvertiserId";

export class FakeAd extends Ad {
  constructor({
    title,
    description,
    image,
    redirectionUrl,
    advertiserId,
  }: AdProps) {
    super({ title, description, image, redirectionUrl, advertiserId });
  }

  static createRandomWithAdvertiserId(id: string): Ad {
    const {fakeTitle, fakeDescription, fakeImage, fakeUrl} = this.generateFakeAdData();

    const title = new AdTitle(fakeTitle);
    const description = new AdDescription(fakeDescription);
    const image = new AdImage(fakeImage);
    const redirectionUrl = new AdRedirectionUrl(fakeUrl);
    const advertiserId = new AdvertiserId(id);

    return new FakeAd({
      title,
      description,
      image,
      redirectionUrl,
      advertiserId,
    });
  }

  static createRandom(): Ad {
    const {fakeTitle, fakeDescription, fakeImage, fakeUrl} = this.generateFakeAdData();
    const fakeAdvertiserId = Math.floor(Math.random() * 100000).toString(16);

    const title = new AdTitle(fakeTitle);
    const description = new AdDescription(fakeDescription);
    const image = new AdImage(fakeImage);
    const redirectionUrl = new AdRedirectionUrl(fakeUrl);
    const advertiserId = new AdvertiserId(fakeAdvertiserId);

    return new FakeAd({
      title,
      description,
      image,
      redirectionUrl,
      advertiserId,
    });
  }

  static empty(): Ad {
    const title = new AdTitle("");
    const description = new AdDescription("");
    const image = new AdImage("");
    const redirectionUrl = new AdRedirectionUrl("");
    const advertiserId = new AdvertiserId("");

    return new FakeAd({
      title,
      description,
      image,
      redirectionUrl,
      advertiserId,
    });
  }

  private static generateFakeAdData(): FakeAdDataProps {
    const fakeTitle = faker.commerce
      .productName()
      .substring(0, AdConstants.titleMaxLength);
    const fakeDescription = faker.commerce
      .productDescription()
      .substring(0, AdConstants.descriptionMaxLength);
    const fakeImage = faker.image.avatar();
    const fakeUrl = faker.internet.url();

    return { fakeTitle, fakeDescription, fakeImage, fakeUrl };
  }
}

interface FakeAdDataProps {
  fakeTitle: string;
  fakeDescription: string;
  fakeImage: string;
  fakeUrl: string;
}
