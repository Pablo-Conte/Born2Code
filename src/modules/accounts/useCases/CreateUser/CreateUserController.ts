import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async control(request: Request, response: Response): Promise<Response> {
    const userObject = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const newUser = await createUserUseCase.execute({
      userData: userObject,
    });

    return response.status(201).json(newUser); // 201 -> Created
  }
}

export { CreateUserController };
