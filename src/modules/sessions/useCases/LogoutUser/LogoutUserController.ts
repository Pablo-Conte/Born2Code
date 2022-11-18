import { Request, Response } from "express";
import { container } from "tsyringe";

import { UserLogoutUseCase } from "./UserLogoutUseCase";

class LogoutUserController {
  async control(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;

    const userLogoutUseCase = container.resolve(UserLogoutUseCase);
    await userLogoutUseCase.execute({ userId });

    return response.status(204).send();
  }
}

export { LogoutUserController };
