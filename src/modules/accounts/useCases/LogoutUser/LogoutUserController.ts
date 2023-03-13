import { Request, Response } from "express";
import { container } from "tsyringe";

import { UserLogoutService } from "./UserLogoutService";

class LogoutUserController {
  async control(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;

    const userLogoutService = container.resolve(UserLogoutService);

    await userLogoutService.execute({ userId });

    return response.status(204).send();
  }
}

export { LogoutUserController };
