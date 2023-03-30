import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { ActionQuery } from "@/src/watching-ad/domain/ActionQuery";
import { reqBodyParse } from "@/src/utils/helpers";
import { NextApiRequest, NextApiResponse } from "next";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import {
  TWatchingAdAction,
  WatchingAdActionName,
} from "@/src/watching-ad/domain/WatchingAdActionName";
import {
  findWatchingAd,
  finishWatchingAdHandler,
  initWatchingAdTimer,
  startWatchingAdHandler,
} from "@/src/watching-ad/infrastructure/watching-ad-container";
import { updateReferral } from "@/src/modules/referrals/infrastructure/referral-container";
import { RoleType } from "@/src/common/domain/Role";
import { IApiResp } from "@/src/common/domain/interfaces/IApiResponse";
import { updateCampaignMetrics } from "@/src/modules/campaign/infrastructure/campaign-container";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";

export type IApiReqWatchingAdAction = {
  refereeValue: string;
  referrerValue: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiResp>
) {
  if (req.method !== "PUT")
    return res.status(400).json({ message: "Bad request method" });

  const session = userSession.getFromServer({ req, res });
  if (session && session.role !== RoleType.USER)
    return res.status(400).json({ message: "Only users can view ads" });

  const { refereeValue, referrerValue }: IApiReqWatchingAdAction =
    reqBodyParse(req);

  const eventTrigger: Record<TWatchingAdAction, Function> = {
    "start-watching-ad": async () => {
      await startWatchingAdHandler.start({ refereeValue, referrerValue });
    },
    "finish-watching-ad": async () => {
      await finishWatchingAdHandler.validateAndAirdrop({
        refereeValue,
        referrerValue,
      });
      //* => this.updateReferral.increaseWatchedAds(sessionId);
    },
  };

  try {
    const query = new ActionQuery(req.query);
    const action = WatchingAdActionName.validateFromString(query.action);
    const actionName = action.action as TWatchingAdAction;

    await MongoDB.connectAndDisconnect(async () => {
      //Todo: Test what happens when the user closes session and the timer is ON,
      //todo: - in that case avoid sending payment
      await eventTrigger[actionName]();
    });

    return res.status(200).json({ message: "Action processed" });
  } catch (err) {
    console.error(err);
    if (err instanceof Error)
      return res.status(400).json({
        message: err.message,
      });
  }
}
