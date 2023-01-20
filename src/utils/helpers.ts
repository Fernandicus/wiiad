import { NextApiRequest } from "next";
import { IApiResp } from "../common/domain/interfaces/IApiResponse";

export const reqBodyParse = (req: NextApiRequest) =>
  typeof req.body !== "object" ? JSON.parse(req.body) : req.body;

export const getEnumValues = <T extends object>(enumType: T): unknown[] => {
  const entryValues = Object.values(enumType);
  const values = entryValues.slice(entryValues.length / 2);
  return values;
};

export async function getApiResponse<T extends IApiResp<unknown>>(
  response: Response
): Promise<T> {
  const respJSON = (await response.json()) as T;
  return respJSON;
}
