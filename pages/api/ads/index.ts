import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(400);

  try {
    
    /* 
    const adRepository = await MongoDB.adRepository();
    const findAds = new FindAds(adRepository);
    const adsFound = await findAds.findAllByAdvertiserId(
      new AdvertiserId(advertiserId)
    );
    
    const ads = adsFound.map((ad) => {
      return new Ad({
        title: new AdTitle(ad.title),
        description: new AdDescription(ad.description),
        image: new AdImage(ad.image),
        advertiserId: new AdvertiserId(ad.advertiserId),
        id: new AdId(ad.id),
        redirectionUrl: new AdRedirectionUrl(ad.redirectionUrl),
        segments: new AdSegments(ad.segments),
      });
    }); 
    
    return res.status(200).json({ads});
    */

    return res.status(200).json({});
  } catch (err) {
    return res.status(400);
  }
}
