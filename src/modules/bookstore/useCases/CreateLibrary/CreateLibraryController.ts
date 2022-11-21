import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../shared/errors/appError";
import { CreateLibraryUseCase } from "./CreateLibraryUseCase";

class CreateLibraryController {
  async control(request: Request, response: Response): Promise<Response> {
    const { isAdmin } = request.user;
    if (!isAdmin) throw new AppError("You aren't and admin to do that", 401);

    const { nameLibrary } = request.body;
    const createLibraryService = container.resolve(CreateLibraryUseCase);

    const library = await createLibraryService.execute({ nameLibrary });

    return response.status(201).json(library);
  }
}

export { CreateLibraryController };
