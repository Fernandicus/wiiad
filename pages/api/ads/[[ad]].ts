import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(400);
  const queryAd = req.query;
  try {
    if (queryAd === undefined) {
      console.log("FIND ALL ADS")
    } else {
      console.log("FIND QUERY AD")
    }
  } catch (err) {}
}
