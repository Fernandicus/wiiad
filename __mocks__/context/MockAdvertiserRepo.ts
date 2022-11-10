import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { Advertiser } from "@/src/modules/advertiser/domain/Advertiser";
import { IAdvertiserRepo } from "@/src/modules/advertiser/domain/IAdvertiserRepo";
import { FakeAdvertiser } from "../../__mocks__/lib/modules/advertiser/FakeAdvertiser";

export const mockedAdvertiserRepo = (
  advertiser: Advertiser
): IAdvertiserRepo => {
  const mockedAdvertisers = FakeAdvertiser.createMany();
  const advertisers = [...mockedAdvertisers, advertiser];
  return {
    findByEmail: jest
      .fn()
      .mockImplementation((email: Email): Advertiser | null => {
        const advertiserFound = advertisers.find(
          (adv) => adv.email.email == email.email
        );
        if (!advertiserFound) return null;
        return advertiser;
      }),
    findByName: jest
      .fn()
      .mockImplementation((name: Name): Advertiser | null => {
        const advertiserFound = advertisers.find(
          (adv) => adv.name.name == name.name
        );
        if (!advertiserFound) return null;
        return advertiser;
      }),
    findById: jest.fn(),
    save: jest.fn(),
  };
};
