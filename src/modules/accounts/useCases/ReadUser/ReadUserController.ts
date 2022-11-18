import { Request, Response } from "express";
import { container } from "tsyringe";
import { ReadUserUseCase } from "./ReadUserUseCase";

class ReadUserController {
  async control(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;
    const userIdRead = request.headers["x-user-id"] as string;

    const readUserUseCase = container.resolve(ReadUserUseCase);
    const User = await readUserUseCase.execute({
      userId,
      id: userIdRead,
    });

    return response.status(200).json(User);
  }
}

export { ReadUserController };
