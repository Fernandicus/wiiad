import { ErrorCreatingAd } from "@/src/ad/domain/ErrorCreatingAd";
import { CreateAd } from "@/src/ad/use-case/CreateAd";
import { FakeAd } from "../../../../__mocks__/lib/advertise/FakeAd";
import { Repository } from "@/src/ad/domain/Repository";
import mongoose from "mongoose";

describe("On Create New Ad", () => {
    it("Repository should call the save method with the advertise data", async () => {

    const mockedRepository: Repository = {
      save: jest.fn(),
      findAllByAdvertiserId: jest.fn(),
    };
    const createAd = new CreateAd(mockedRepository);
    const advertise = FakeAd.createRandom();

    await createAd.save(advertise);

    expect(mockedRepository.save).toBeCalledWith(advertise);
  });
  
  it("Throw 'ErrorCreatingAd' on empty advertise data", () => {
    expect(() => {
      FakeAd.empty();
    }).toThrowError(ErrorCreatingAd);
  }); 
  
});
