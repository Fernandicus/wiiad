import { NextApiRequest } from "next";

export const reqBodyParse = (req: NextApiRequest) =>
  typeof req.body !== "object" ? JSON.parse(req.body) : req.body;
