import AdDescription from "src/ad/domain/ValueObjects/AdDescription";
import AdImage from "src/ad/domain/ValueObjects/AdImage";
import AdRedirectionUrl from "src/ad/domain/ValueObjects/AdRedirectionUrl";
import AdTitle from "src/ad/domain/ValueObjects/AdTitle";
import { Ad, AdProps } from "src/ad/domain/Ad";
import { faker } from "@faker-js/faker";
import { AdConstants } from "src/ad/ad-constants";
import { Schema } from "mongoose";
import AdvertiserId from "src/ad/domain/ValueObjects/AdvertiserId";

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

  static createRandom(): Ad {
    const fakeTitle = faker.commerce
      .productName()
      .substring(0, AdConstants.titleMaxLength);
    const fakeDescription = faker.commerce
      .productDescription()
      .substring(0, AdConstants.descriptionMaxLength);
    const fakeId = Math.floor(Math.random() * 10000);

    const title = new AdTitle(fakeTitle);
    const description = new AdDescription(fakeDescription);
    const image = new AdImage(faker.image.avatar());
    const redirectionUrl = new AdRedirectionUrl(faker.internet.url());
    const advertiserId = new AdvertiserId(fakeId);

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
    const advertiserId = new AdvertiserId(0);

    return new FakeAd({
      title,
      description,
      image,
      redirectionUrl,
      advertiserId,
    });
  }
}
