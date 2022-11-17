import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUserUseCase } from "./DeleteUserUsecase";

class DeleteUserController {
  async control(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;

    const userIdDelete = request.headers["x-user-id"] as string;

    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    await deleteUserUseCase.execute({
      myId: userId,
      id: userIdDelete,
    });

    return response.status(204).send();
  }
}

export { DeleteUserController };
