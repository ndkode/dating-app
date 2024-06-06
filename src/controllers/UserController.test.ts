import "reflect-metadata";
import { UserController } from "./UserController";
import container from "../inversify.config";
import { mockReq, mockRes } from "sinon-express-mock";
import { UserService } from "../services/UserService";
import { createStubInstance } from "sinon";
import User from "../models/User";

describe("UserController", () => {
  let controller: UserController;

  beforeEach(() => {
    // Mock the UserService class (entire instance)
    container.unbind(UserService);
    const mockInstance = createStubInstance(UserService);
    const user = new User();
    user.username = "123";
    mockInstance.findUserByEmail.resolves(user);

    container.bind(UserService).toConstantValue(mockInstance)

    controller = container.get(UserController);
  });

  describe("signup", () => {
    it("should have a status code of 400", async () => {
      const req = mockReq({
        body: {
          username: "nandangk95",
          email: "nandang.k95@gmail.com",
          password: "1234",
        },
      });
      const res = mockRes();
      const response = await controller.signup(req, res);
      expect(response?.statusCode).toEqual(400);
    });
  });
});
