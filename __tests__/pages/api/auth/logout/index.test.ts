import apiLogOut from "@/pages/api/v1/auth/logout/index";
import { mockedContext } from "../../../../../__mocks__/context/MockContext";

describe("On api/v1/auth/logout/index", () => {

  it("WHEN send a non 'GET' request, THEN return status code 400", async () => {
    const { req, res } = mockedContext({
      method: "POST",
    });

    apiLogOut(req, res);

    expect(res.statusCode).toBe(400);
  });


  it("WHEN send a 'GET' request, THEN return status code 200", async () => {
    const { req, res } = mockedContext({
      method: "GET",
    });

    apiLogOut(req, res);

    expect(res.statusCode).toBe(200);
  });
});
