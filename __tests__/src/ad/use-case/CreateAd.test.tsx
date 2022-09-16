import { ErrorCreatingAd } from "src/ad/domain/ErrorCreatingAd";
import { CreateAd } from "src/ad/use-case/CreateAd";
import { FakeAd } from "../../../../__mocks__/lib/advertise/FakeAd";

describe("On Create New Ad", () => {
  it("Repository should call the save method 1 time", async () => {
    const mockedRepository = { save: jest.fn(), findById: jest.fn() };
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
