import CreateAdError from "@/lib/ad/domain/CreateAdError";
import { CreateAd } from "@/lib/ad/use-case/CreateAd";
import AdvertiseFake from "../../../../__mocks__/lib/advertise/AdFake";

describe("On Create New Ad", () => {
  it("Repository should call the save method 1 time", async () => {
    const mockedRepository = { save: jest.fn() };
    const createAdvertise = new CreateAd(mockedRepository);
    const advertise = AdvertiseFake.createRandom();

    await createAdvertise.save(advertise);

    expect(mockedRepository.save).toBeCalledTimes(1);
  });

  it("Throw 'CreateAdError' on empty advertise data", () => {
    expect(() => {
      AdvertiseFake.empty();
    }).toThrowError(CreateAdError);
  });
});
