import { IWebSocketService } from "@/src/watching-ad/pusher/domain/interface/IWebSocketService";

export const mockedWSS = (): IWebSocketService => {
  return {
    authenticateChannel: jest.fn(),
    authenticateUser: jest.fn(),
    closeConnection: jest.fn(),
    sendEventToUser: jest.fn(),
  };
};
