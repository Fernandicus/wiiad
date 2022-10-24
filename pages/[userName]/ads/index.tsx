import { IGenericUserPrimitives } from "@/src/domain/IUser";
import { RolType } from "@/src/domain/Rol";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { adFinderHandler } from "@/src/modules/ad/ad-container";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import {
  CampaignBudget,
  CampaignBudgetProps,
} from "@/src/modules/campaign/domain/value-objects/Budget";
import { userSession } from "@/src/use-case/container";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function NewCampaign(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const advertiser: AdvertiserPropsPrimitives = props.advertiser;
  const ads: AdPropsPrimitives[] = props.ads;
  const budget: CampaignBudgetProps = {
    maxClicks: 1000,
    moneyToSpend: 50,
  };
  const launchCampaignURL = "/api/campaign/launch";

  const deleteAd = async (id: string) => {
    try {
      const resp = await fetch("api/ads/remove", {
        method: "DELETE",
        body: JSON.stringify({ adId: id }),
      });
      if (resp.status !== 200) console.error(resp);
    } catch (err) {}
  };

  const launchCampaign = async (ad: AdPropsPrimitives) => {
    console.log("LAUNCH ", ad.id);
    try {
      const resp = await fetch(launchCampaignURL, {
        method: "POST",
        body: JSON.stringify({
          id: ad.id,
          budget,
        }),
      });
      if (resp.status === 200) {
        console.log("NEW CAMPAIGN LAUNCHED");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Ads</h1>
      <ul className="Ads">
        {ads &&
          ads.map((ad) => {
            return (
              <li key={ad.id}>
                <img src={ad.image} ></img>
                <p>{ad.title}</p>
                <p>{`${ad.description.slice(0, 25)}...`}</p>
                <p>{ad.redirectionUrl}</p>
                <button type="button" onClick={() => launchCampaign(ad)}>
                  Create new campaign
                </button>
                <button
                  className="removeAds"
                  type="button"
                  onClick={() => deleteAd(ad.id)}
                >
                  Remove
                </button>
              </li>
            );
          })}
      </ul>
      <form></form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const session = userSession.getFromServer(context);
    if (!session || session.rol === RolType.USER)
      throw new Error("Wrong session provided");

    const ads = await MongoDB.connectAndDisconnect(
      async () => await adFinderHandler.findAll(session.id)
    );

    return {
      props: {
        advertiser: { ...session } as IGenericUserPrimitives,
        ads,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {},
      redirect: { destination: "/", permanent: false },
    };
  }
};
