import { NextApiRequest, NextApiResponse } from "next";
import httpMock, { Mocks, RequestMethod, Headers, Query } from "node-mocks-http";

interface IMockedContext {
  method?: RequestMethod;
  body?: object;
  headers?: Headers;
  query?: Query,
}

export const mockedContext = (
  params?: IMockedContext
): Mocks<NextApiRequest, NextApiResponse> => {
  return {
    req: httpMock.createRequest({query: params?.query, method: params?.method, body: params?.body, headers: params?.headers, }),
    res: httpMock.createResponse(),
  };
};
