import { Request, Response } from "express";
import { AppError } from "@shared/errors/appError";
import { container } from "tsyringe";
import { CreateBookUseCase } from "./CreateBookUseCase";

class CreateBookController {
  async control(request: Request, response: Response): Promise<Response> {
    const dataToCreateBook = request.body;

    if (!request.user.isAdmin) throw new AppError("You aren't an Admin!", 401);

    const createBookUseCase = container.resolve(CreateBookUseCase);

    const newBook = await createBookUseCase.execute({ dataToCreateBook });

    return response.status(201).json(newBook);
  }
}

export { CreateBookController };
