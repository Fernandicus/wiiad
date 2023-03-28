import { NextApiRequest } from "next";
import { ChangeEvent, RefObject } from "react";
import { IApiResp } from "../common/domain/interfaces/IApiResponse";
import { Role, RoleType } from "../common/domain/Role";
import { UniqId } from "../common/domain/UniqId";
import { IUserPrimitives } from "../modules/users/user/domain/User";

export const reqBodyParse = (req: NextApiRequest) =>
  typeof req.body !== "object" ? JSON.parse(req.body) : req.body;

export const getValuesForNumericEnum = <T extends object>(
  enumType: T
): unknown[] => {
  const entryValues = Object.values(enumType);
  const values = entryValues.slice(entryValues.length / 2);
  return values;
};

export const getApiResponse = async <T extends IApiResp<unknown>>(
  response: Response
): Promise<T> => {
  const respJSON = (await response.json()) as T;
  return respJSON;
};

export const assertUnreachable = (assert: never): never => {
  throw new Error("Missing switch case");
};

export const replaceInputTextSpacesWith = (
  e: ChangeEvent<HTMLInputElement>,
  replacer: string
): string => {
  return e.target.value.replace(/\s/g, replacer);
};

export const isUser = <T>(role: Role, fn: { then: () => T }): T | void => {
  if (role.role === RoleType.USER) return fn.then();
};

export const isAdvertiser = <T>(
  role: Role,
  fn: { then: () => T }
): T | void => {
  if (role.role === RoleType.BUSINESS) return fn.then();
};

export function verifyIdFromString(
  value: string,
  reference: string
): { uniqId: UniqId; prefix: string } {
  if (!value.includes(reference))
    throw new Error(`No reference found in ${value}`);

  const uniqId = new UniqId(value);
  const prefix = value.split(reference)[0];
  return { uniqId, prefix };
}
