import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "@shared/errors/appError";
import { DeleteBookUseCase } from "./DeleteBookUseCase";

class DeleteBookController {
  async control(request: Request, response: Response): Promise<Response> {
    if (!request.user.isAdmin)
      throw new AppError("User isn't an admin to do this!", 401);

    const idToDelete = request.headers["x-book-id"] as string;

    const deleteBookUseCase = container.resolve(DeleteBookUseCase);

    await deleteBookUseCase.execute({ id: idToDelete });

    return response.status(204).send();
  }
}

export { DeleteBookController };
