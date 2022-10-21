import { Request, Response } from "express";

import { AppError } from "../../../../shared/errors/appError";
import { CreateBookService } from "./CreateBookService";

class CreateBookController {
  async control(request: Request, response: Response): Promise<Response> {
    const dataToCreateBook = request.body;

    if (!request.user.isAdmin) throw new AppError("You aren't an Admin!", 401);

    const createBookService = new CreateBookService();

    const newBook = await createBookService.execute({ dataToCreateBook });

    return response.status(201).json(newBook);
  }
}

export { CreateBookController };
