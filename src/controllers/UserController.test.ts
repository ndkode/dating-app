import "reflect-metadata";
import { UserController } from "./UserController";
import container from "../inversify.config";

import { HttpContext, interfaces } from "inversify-express-utils";

describe("UserController", () => {
  let controller: UserController;

  beforeEach(() => {
    const httpContext: HttpContext = {
        request: <any>{},
        response: <any>{},
        container: container,
        user: <any>{},
    };

    container
      .bind<interfaces.HttpContext>(Symbol.for("HttpContext"))
      .toConstantValue(httpContext);
    controller = container.get(UserController);
  });

  describe("signup", () => {
    it("should have a status code of 403", async () => {
        const req = <any>{
            body: {username: ""}
        }
        const res =<any> {}
      const response = await controller.signup(req, res);
      console.log(response);
      // expect(response).toBe().instanceof(results.JsonResult);
      // expect(response.statusCode).to.equal(403);
    });
  });
});
