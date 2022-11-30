import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { ErrorFindingUser } from "@/src/modules/users/user/domain/ErrorFindingUser";
import { IUserRepo } from "@/src/modules/users/user/domain/IUserRepo";
import { User } from "@/src/modules/users/user/domain/User";
import { FindAdvertiser } from "@/src/modules/users/user/use-case/FindAdvertiser";
import { FakeAdvertiser } from "../../../../__mocks__/lib/modules/user/FakeAdvertiser";
import { mockedAdvertiserRepo } from "../../../../__mocks__/context/MockUserRepo";

describe("On FindAdvertiser, GIVEN an advertiser", () => {
  let advertiserRepo: IUserRepo;
  let advertiser: User;
  let findAdvertiser: FindAdvertiser;

  beforeAll(() => {
    advertiser = FakeAdvertiser.create();
    advertiserRepo = mockedAdvertiserRepo(advertiser)
    findAdvertiser = new FindAdvertiser(advertiserRepo);
  });

  it(`WHEN call create, THEN advertiser repo save method should be called with advertiser email`, async () => {
    const advertiserFound = await findAdvertiser.byEmail(advertiser.email);
    expect(advertiserRepo.findAdvertiserByEmail).toBeCalledWith(advertiser.email);
    expect(advertiserFound).toEqual(advertiser);
  });

  it(`WHEN call byUserName for an existing advertiser name, 
  THEN advertiser repo byUserName method should be called with advertiser name`, async () => {
    const advertiserFound = await findAdvertiser.byName(advertiser.name);
    expect(advertiserRepo.findAdvertiserByName).toBeCalledWith(advertiser.name);
    expect(advertiserFound).toEqual(advertiser);
  });

  it(`WHEN call findByUserName for a not existing advertiser name, 
  THEN an ErrorFingindUser exception should be thrown`, async () => {
    const nonExistingName = new Name("X");
    expect(findAdvertiser.byName(nonExistingName)).rejects.toThrowError(
      ErrorFindingUser
    );
  });

  it(`WHEN call findByEmail for an existing advertiser email, 
  THEN advertiser repo findByEmail method should be called with advertiser email`, async () => {
    const advertiserFound = await findAdvertiser.byEmail(advertiser.email);
    expect(advertiserRepo.findAdvertiserByEmail).toBeCalledWith(advertiser.email);
    expect(advertiserFound).toEqual(advertiser);
  });

  it(`WHEN call findByUserName for a not existing advertiser email, 
  THEN an ErrorFingindUser exception should be thrown`, async () => {
    const nonExistingEmail = new Email("x@x.com");
    expect(findAdvertiser.byEmail(nonExistingEmail)).rejects.toThrowError(
      ErrorFindingUser
    );
  });
});
