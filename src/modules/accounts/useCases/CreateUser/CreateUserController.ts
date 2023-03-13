import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserService } from "./CreateUserService";

class CreateUserController {
  
  async control(request: Request, response: Response): Promise<Response> {
    
    const userObject = request.body;
    const createUserService = container.resolve(CreateUserService);
    const newUser = await createUserService.execute({ userData: userObject });

    return response.status(201).json(newUser); // 201 -> Created
  }
}

export { CreateUserController };
