import { userSession } from "@/src/use-case/container";
import { IReqAndRes } from "@/src/domain/IAuthCookies";
import { ErrorCreatingAd } from "../domain/ErrorCreatingAd";
import { RoleType } from "@/src/domain/Role";
import { adCreatorHandler } from "../ad-container";
import { AdPropsPrimitives } from "../domain/Ad";
import { uploadFileHandler } from "@/src/utils/generic-container";

interface CreateAdControllerParams {
  context: IReqAndRes;
  adProps: AdPropsPrimitives;
  adId: string;
}

export class CreateAdController {
  static async create({
    adId,
    adProps,
    context,
  }: CreateAdControllerParams): Promise<void> {
    const session = userSession.getFromServer(context);

    if (!session) throw new ErrorCreatingAd("No auth");
    if (session.role === RoleType.USER)
      throw new ErrorCreatingAd(
        `This rol cant do this operation ${session.role}`
      );

    const imageUrl = await uploadFileHandler.imageAdvertising({
      file: adProps.image,
      advertiserName: session.name,
    });

    await adCreatorHandler.create({
      adProps: { ...adProps, image: imageUrl },
      advertiserId: session.id,
      adId,
    });
  }

  static async videoAd({
    adId,
    adProps,
    context,
  }: CreateAdControllerParams): Promise<void> {
    const session = userSession.getFromServer(context);

    if (!session) throw new ErrorCreatingAd("No auth");
    if (session.role === RoleType.USER)
      throw new ErrorCreatingAd(
        `This rol cant do this operation ${session.role}`
      );

    const videoUrl = await uploadFileHandler.videoAdvertising({
      file: adProps.image,
      advertiserName: session.name,
    });

    console.log("VIDEO URL");
    console.log(videoUrl);

    await adCreatorHandler.create({
      adProps: { ...adProps, image: videoUrl },
      advertiserId: session.id,
      adId,
    });
  }
}
