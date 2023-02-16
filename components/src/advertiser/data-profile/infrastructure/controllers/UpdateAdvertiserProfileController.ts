import { uploadFileToCloudHandler } from "@/components/src/cloud-file-store/infrastructure/cloud-file-store-container";
import { updateAdvertiserProfHandler } from "../advertiser-container";

const updateFunc = updateAdvertiserProfHandler.update;
type IUpdateProps = Parameters<typeof updateFunc>[0];

export class UpdateAdvertiserProfController {
  constructor() {}

  async update(props: IUpdateProps): Promise<void> {
    const { profilePic } = props;
    let updatedProfilePic;

    if (profilePic) {
      updatedProfilePic = await uploadFileToCloudHandler.profilePic(profilePic);
    }

    await updateAdvertiserProfHandler.update({
      ...props,
      profilePic: updatedProfilePic,
    });
  }
}
