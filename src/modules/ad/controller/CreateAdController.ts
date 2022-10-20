import { userSession } from "@/src/use-case/container";
import { IReqAndRes } from "@/src/domain/IAuthCookies";
import { ErrorCreatingAd } from "../domain/ErrorCreatingAd";
import { RolType } from "@/src/domain/Rol";
import { adCreatorHandler } from "../ad-container";
import { AdPropsPrimitives } from "../domain/Ad";

export class CreateAdController {
  static async create(
    context: IReqAndRes,
    adProps: AdPropsPrimitives
  ): Promise<void> {
    const session = userSession.getFromServer(context);

    if (!session) throw new ErrorCreatingAd("No auth");
    if (session.rol === RolType.USER)
      throw new ErrorCreatingAd(
        `This rol cant do this operation ${session.rol}`
      );

    await adCreatorHandler.create(adProps, session.id);
  }
}
