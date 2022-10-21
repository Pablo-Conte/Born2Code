import { Request, Response } from "express";

import { CreateUserService } from "./CreateUserService";

class CreateUserController {
  async control(request: Request, response: Response): Promise<Response> {
    const userObject = request.body;
    const createUserService = new CreateUserService();
    const newUser = await createUserService.execute({ userData: userObject });

    return response.status(201).json(newUser); // 201 -> Created
  }
}

export { CreateUserController };
