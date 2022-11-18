import { Request, Response } from "express";
import { container } from "tsyringe";

import { UserLoginUseCase } from "./UserLoginUseCase";

class UserLoginController {
  async control(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const userLoginUseCase = container.resolve(UserLoginUseCase);

    const newToken = await userLoginUseCase.execute({ email, password });

    return response.status(200).json(newToken);
  }
}

export { UserLoginController };
