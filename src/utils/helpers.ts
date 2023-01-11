import { NextApiRequest } from "next";

export const reqBodyParse = (req: NextApiRequest) =>
  typeof req.body !== "object" ? JSON.parse(req.body) : req.body;

export const getEnumValues = <T extends object>(enumType: T): unknown[] => {
  const entryValues = Object.values(enumType);
  const values = entryValues.slice(entryValues.length / 2);
  return values;
};
