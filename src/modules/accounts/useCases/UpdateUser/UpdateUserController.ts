import { Request, Response } from "express";

import { UserEntity } from "../../infra/entities/UserEntity";
import { UpdateUserService } from "./UpdateUserService";

class UpdateUserController {
  async control(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;

    const userData = request.body as Partial<UserEntity>;

    if (userData.password) {
      return response
        .status(401)
        .json({ message: "Password isn't alterable in this route" });
    }

    const updateUserService = new UpdateUserService();

    const updatedUser = await updateUserService.execute({
      id: userId,
      userData,
    });

    return response.status(200).json(updatedUser);
  }
}

export { UpdateUserController };
