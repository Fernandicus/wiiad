import { userSession } from "@/src/use-case/container";
import { IReqAndRes } from "@/src/domain/IAuthCookies";
import { ErrorCreatingAd } from "../domain/ErrorCreatingAd";
import { RoleType } from "@/src/domain/Role";
import { adCreatorHandler } from "../ad-container";
import { AdPropsPrimitives } from "../domain/Ad";
import { uploadFileHandler } from "@/src/utils/generic-container";

export class CreateAdController {
  static async create(props: {
    context: IReqAndRes;
    adProps: AdPropsPrimitives;
    adId: string;
  }): Promise<void> {
    const { adId, adProps, context } = props;
    const session = userSession.getFromServer(context);

    if (!session) throw new ErrorCreatingAd("No auth");
    if (session.role === RoleType.USER)
      throw new ErrorCreatingAd(
        `This rol cant do this operation ${session.role}`
      );

    const imageUrl = await uploadFileHandler.advertiseImage({
      file: adProps.image,
      advertiserName: session.name,
    });

    await adCreatorHandler.create({
      adProps: { ...adProps, image: imageUrl },
      advertiserId: session.id,
      adId,
    });
  }
}
