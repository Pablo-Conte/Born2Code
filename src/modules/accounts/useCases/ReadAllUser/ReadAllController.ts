import { Request, Response } from "express";
import { container } from "tsyringe";
import { ReadAllUseCase } from "./ReadAllUseCase";

class ReadAllController {
  async control(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;

    const readAllUseCase = container.resolve(ReadAllUseCase);
    const users = await readAllUseCase.execute({ userId });

    return response.status(200).json(users);
  }
}

export { ReadAllController };
