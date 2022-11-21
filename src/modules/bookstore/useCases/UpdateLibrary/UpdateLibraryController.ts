import { LibraryEntity } from "@modules/bookstore/infra/entities/LibraryEntity";
import { AppError } from "@shared/errors/appError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateLibraryUseCase } from "./UpdateLibraryUseCase";

class UpdateLibraryController {
  async control(request: Request, response: Response): Promise<Response> {
    if (!request.user.isAdmin)
      throw new AppError("User is not an Admin to do this!", 401);

    const updateLibraryUseCase = container.resolve(UpdateLibraryUseCase);

    const dataToChangeOnLibrary = request.body as Partial<LibraryEntity>;
    const libraryId = request.headers["x-library-id"] as string;

    const updatedLibrary = await updateLibraryUseCase.execute({
      data: dataToChangeOnLibrary,
      libraryId,
    });

    return response.status(201).json(updatedLibrary);
  }
}

export { UpdateLibraryController };
