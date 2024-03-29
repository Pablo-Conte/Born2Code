import { Request, Response } from "express";
import { container } from "tsyringe";

import { UserLoginService } from "./UserLoginService";

class UserLoginController {
  async control(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const userLoginService = container.resolve(UserLoginService);

    const newToken = await userLoginService.execute({ email, password });

    return response.status(200).json(newToken);
  }
}

export { UserLoginController };
