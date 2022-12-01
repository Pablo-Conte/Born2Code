import { LibraryEntity } from "@modules/bookstore/infra/entities/LibraryEntity";
import { AppError } from "@shared/errors/appError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateLibraryUseCase } from "./UpdateLibraryUseCase";

class UpdateLibraryController {
  async control(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;
    const libraryId = request.headers["x-library-id"] as string;
    const dataToChangeOnLibrary = request.body as Partial<LibraryEntity>;

    const updateLibraryUseCase = container.resolve(UpdateLibraryUseCase);
    const updatedLibrary = await updateLibraryUseCase.execute({
      data: dataToChangeOnLibrary,
      libraryId,
      userId,
    });

    return response.status(201).json(updatedLibrary);
  }
}

export { UpdateLibraryController };
