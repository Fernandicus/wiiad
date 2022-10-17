import { NextApiRequest, NextApiResponse } from "next";
import httpMock, { Mocks, RequestMethod } from "node-mocks-http";

export const MockContext = function (
  method: RequestMethod,
  body: object,
): Mocks<NextApiRequest, NextApiResponse> {
  return {
    req: httpMock.createRequest({ method, body }),
    res: httpMock.createResponse(),
  };
};
