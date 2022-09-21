import { ErrorCreatingAd } from "@/src/ad/domain/ErrorCreatingAd";
import { CreateAd } from "@/src/ad/use-case/CreateAd";
import { FakeAd } from "../../../../__mocks__/lib/advertise/FakeAd";
import { AdRepository } from "@/src/ad/domain/AdRepository";
import { AdUniqId } from "@/src/ad/infraestructure/AdUniqId";

describe("On Create New Ad", () => {
    it("Repository should call the save method with the advertise data", async () => {

    const mockedRepository: AdRepository = {
      save: jest.fn(),
      findAllByAdvertiserId: jest.fn(),
      remove: jest.fn()
    };
    const createAd = new CreateAd(mockedRepository);
    const advertiserId = AdUniqId.generate();
    const adId = AdUniqId.generate();
    const advertise = FakeAd.withIds({advertiserId, adId});

    await createAd.save(advertise);

    expect(mockedRepository.save).toBeCalledWith(advertise);
  });
  
  it("Throw 'ErrorCreatingAd' on empty advertise data", () => {
    expect(() => {
      FakeAd.empty();
    }).toThrowError(ErrorCreatingAd);
  }); 
  
});
