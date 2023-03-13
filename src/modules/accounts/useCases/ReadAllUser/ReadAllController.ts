import { Request, Response } from "express";
import { container } from "tsyringe";

import { ReadAllService } from "./ReadAllService";

class ReadAllController {
  async control(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;

    const readAllService = container.resolve(ReadAllService);

    const users = await readAllService.execute({ userId });

    return response.status(200).json(users);
  }
}

export { ReadAllController };
