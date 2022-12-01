import { AppError } from "@shared/errors/appError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateLibraryUseCase } from "./CreateLibraryUseCase";

class CreateLibraryController {
  async control(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;

    const { nameLibrary } = request.body;
    const createLibraryService = container.resolve(CreateLibraryUseCase);

    const library = await createLibraryService.execute({ nameLibrary, userId });

    return response.status(201).json(library);
  }
}

export { CreateLibraryController };
