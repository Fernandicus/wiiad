import { userSession } from "@/src/use-case/container";
import { IReqAndRes } from "@/src/domain/IAuthCookies";
import { ErrorCreatingAd } from "../domain/ErrorCreatingAd";
import { RolType } from "@/src/domain/Rol";
import { adCreatorHandler } from "../ad-container";
import { ICreateAdBodyReq } from "@/pages/api/ads/create";

export class CreateAdController {
  static async create(
    context: IReqAndRes,
    body: ICreateAdBodyReq
  ): Promise<void> {
    const session = userSession.getFromServer(context);

    if (!session) throw new ErrorCreatingAd("No auth");
    if (session.rol === RolType.USER)
      throw new ErrorCreatingAd(
        `This rol cant do this operation ${session.rol}`
      );

    await adCreatorHandler.create(body, session.id);
  }
}
