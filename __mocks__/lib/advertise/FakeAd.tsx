import { AdDescription } from "@/src/ad/domain/ValueObjects/AdDescription";
import { AdImage } from "@/src/ad/domain/ValueObjects/AdImage";
import { AdRedirectionUrl } from "@/src/ad/domain/ValueObjects/AdRedirectionUrl";
import { AdTitle } from "@/src/ad/domain/ValueObjects/AdTitle";
import { Ad, AdProps } from "@/src/ad/domain/Ad";
import { faker } from "@faker-js/faker";
import { AdConstants } from "@/src/ad/ad-constants";
import { AdvertiserId } from "@/src/ad/domain/ValueObjects/AdvertiserId";
import {
  AdSegments,
  AdSegmentType,
} from "@/src/ad/domain/ValueObjects/AdSegments";

export class FakeAd extends Ad {
  constructor({
    title,
    description,
    image,
    redirectionUrl,
    advertiserId,
    segments,
  }: AdProps) {
    super({
      title,
      description,
      image,
      redirectionUrl,
      advertiserId,
      segments,
    });
  }

  static createRandomWithAdvertiserId(id: string): Ad {
    const { fakeTitle, fakeDescription, fakeImage, fakeUrl, fakeSegments } =
      this.generateFakeAdData();

    const title = new AdTitle(fakeTitle);
    const description = new AdDescription(fakeDescription);
    const image = new AdImage(fakeImage);
    const redirectionUrl = new AdRedirectionUrl(fakeUrl);
    const advertiserId = new AdvertiserId(id);
    const segments = new AdSegments(fakeSegments);

    return new FakeAd({
      title,
      description,
      image,
      redirectionUrl,
      advertiserId,
      segments,
    });
  }

  static createRandom(): Ad {
    const {
      fakeTitle,
      fakeDescription,
      fakeImage,
      fakeUrl,
      fakeAdvertiserId,
      fakeSegments,
    } = this.generateFakeAdData();

    const title = new AdTitle(fakeTitle);
    const description = new AdDescription(fakeDescription);
    const image = new AdImage(fakeImage);
    const redirectionUrl = new AdRedirectionUrl(fakeUrl);
    const advertiserId = new AdvertiserId(fakeAdvertiserId);
    const segments = new AdSegments(fakeSegments);

    return new FakeAd({
      title,
      description,
      image,
      redirectionUrl,
      advertiserId,
      segments,
    });
  }

  static empty(): Ad {
    const title = new AdTitle("");
    const description = new AdDescription("");
    const image = new AdImage("");
    const redirectionUrl = new AdRedirectionUrl("");
    const advertiserId = new AdvertiserId("");
    const segments = new AdSegments([]);

    return new FakeAd({
      title,
      description,
      image,
      redirectionUrl,
      advertiserId,
      segments,
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
    const fakeAdvertiserId = faker.random.numeric(12);
    const fakeSegments = this.getRandomAdSegments();

    return {
      fakeTitle,
      fakeDescription,
      fakeImage,
      fakeUrl,
      fakeAdvertiserId,
      fakeSegments,
    };
  }

  private static getRandomAdSegments(): AdSegmentType[] {
    const adSegments = Object.values(AdSegmentType);

    const adSegmentsLength = adSegments.length;
    const maxLengthArray = Math.floor(Math.random() * 4);

    let segments: AdSegmentType[] = [];

    for (var i = 0; i <= maxLengthArray; i++) {
      const randomNum = Math.floor(Math.random() * adSegmentsLength);
      segments.push(adSegments[randomNum]);
    }

    return segments;
  }
}

interface FakeAdDataProps {
  fakeTitle: string;
  fakeDescription: string;
  fakeImage: string;
  fakeUrl: string;
  fakeAdvertiserId: string;
  fakeSegments: string[];
}
