import { NextApiRequest, NextApiResponse } from "next";
import httpMock, { Mocks, RequestMethod } from "node-mocks-http";

interface IMockedContext {
  method?: RequestMethod;
  body?: object;
}

export const mockedContext = (
  params?: IMockedContext
): Mocks<NextApiRequest, NextApiResponse> => {
  return {
    req: httpMock.createRequest({ method: params?.method, body: params?.body }),
    res: httpMock.createResponse(),
  };
};
