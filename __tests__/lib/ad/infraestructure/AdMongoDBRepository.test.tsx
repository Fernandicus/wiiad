
import { AdMongoDBRepository } from "@/lib/ad/infraestructure/AdMongoDBRepository";
import { FakeAd } from "../../../../__mocks__/lib/advertise/FakeAd";

describe("Given AdMongoDBRepository", () => {
  it("When save Ad data should be saved in MongoDB Atlas", async () => {
    const ad = FakeAd.createRandom();
    const adMongoDBRepository = await AdMongoDBRepository.connect();
    const adId = await adMongoDBRepository.save(ad);

    const adInRepository = await adMongoDBRepository.findById(adId)
    
    await adMongoDBRepository.disconnect();
    
    expect(adInRepository!.title.title).toBe(ad.title.title);

  });
});