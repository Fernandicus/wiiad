import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { ProfilePic } from "@/src/common/domain/ProfilePic";
import { UpdateAdvertiserProfileData } from "../UpdateAdvertiserProfileData";

export class UpdateAdvertiserProfileDataHandler {
  constructor(private updateProfile: UpdateAdvertiserProfileData) {}

  async update(props: {
    email?: string;
    name?: string;
    profilePic?: string;
  }): Promise<void> {
    const { email, name, profilePic } = props;
    await this.updateProfile.update({
      email: email ? new Email(email) : undefined,
      name: name ? new Name(name) : undefined,
      profilePic: profilePic ? new ProfilePic(profilePic) : undefined,
    });
  }
}
