import CreateAdError from "@/lib/advertise/domain/CreateAdError";
import CreateNewAd from "@/lib/advertise/use-case/CreateNewAd";
import AdvertiseFake from "../../../../__mocks__/lib/advertise/AdvertiseFake";

describe("On Create New Ad", () => {

  it("Repository should call the save method 1 time", async () => {
    const mockedRepository = { save: jest.fn() };
    const newAd = new CreateNewAd(mockedRepository);
    const ad = AdvertiseFake.createRandom();

    await newAd.save(ad);

    expect(mockedRepository.save).toBeCalledTimes(1);
  });

  it("Throw 'CreateAdError' on empty advertise data", () => {
    expect(() => {
      AdvertiseFake.empty();
    }).toThrowError(CreateAdError);
  });
});
