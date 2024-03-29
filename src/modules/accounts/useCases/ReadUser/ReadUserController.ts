import { Request, Response } from "express";
import { container } from "tsyringe";

import { ReadUserService } from "./ReadUserService";

class ReadUserController {
  async control(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;

    const userIdRead = request.headers["x-user-id"] as string;

    const readUserService = container.resolve(ReadUserService);

    const User = await readUserService.execute({
      myId: userId,
      id: userIdRead,
    });

    return response.status(200).json(User);
  }
}

export { ReadUserController };
