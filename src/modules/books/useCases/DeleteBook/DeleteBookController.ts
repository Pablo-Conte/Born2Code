import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteBookUseCase } from "./DeleteBookUseCase";

class DeleteBookController {
  async control(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;

    const idToDelete = request.headers["x-book-id"] as string;

    const deleteBookUseCase = container.resolve(DeleteBookUseCase);

    await deleteBookUseCase.execute({ id: idToDelete, userId });

    return response.status(204).send();
  }
}

export { DeleteBookController };
