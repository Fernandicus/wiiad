
import { AdMongoDBRepository } from "@/lib/ad/infraestructure/AdMongoDBRepository";
import { FakeAd } from "../../../../__mocks__/lib/advertise/FakeAd";

describe("Given AdMongoDBRepository", () => {
  it("When save Ad data should be saved in MongoDB Atlas", async () => {
    const ad = FakeAd.createRandom();
    const mongoDBRepository = await AdMongoDBRepository.connect();
    const adId = await mongoDBRepository.save(ad);
    await mongoDBRepository.disconnect();

    expect(adId).toBe(adId);

    //TODO: expect find data in mongo db atlas
  });
});