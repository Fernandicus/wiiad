import { NextApiRequest, NextApiResponse } from "next";
import httpMock, { Mocks, RequestMethod, Headers } from "node-mocks-http";

interface IMockedContext {
  method?: RequestMethod;
  body?: object;
  headers?: Headers;
}

export const mockedContext = (
  params?: IMockedContext
): Mocks<NextApiRequest, NextApiResponse> => {
  return {
    req: httpMock.createRequest({ method: params?.method, body: params?.body, headers: params?.headers, }),
    res: httpMock.createResponse(),
  };
};
