import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateBookUseCase } from "./CreateBookUseCase";

class CreateBookController {
  async control(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;

    const dataToCreateBook = request.body;

    const createBookUseCase = container.resolve(CreateBookUseCase);

    const newBook = await createBookUseCase.execute({
      dataToCreateBook,
      userId,
    });

    return response.status(201).json(newBook);
  }
}

export { CreateBookController };
