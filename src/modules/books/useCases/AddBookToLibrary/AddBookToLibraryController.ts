import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "@shared/errors/appError";
import { AddBookToLibraryUseCase } from "./AddBookToLibraryUseCase";

class AddBookToLibraryController {
  async control(request: Request, response: Response): Promise<Response> {
    const { userId } = request.body;

    const bookId = request.headers["x-book-id"] as string;
    const libraryId = request.headers["x-library-id"] as string;

    if (!bookId || !libraryId)
      throw new AppError("You forgot the data man!", 404);

    const addBookToLibraryUseCase = container.resolve(AddBookToLibraryUseCase);

    await addBookToLibraryUseCase.execute({ bookId, libraryId, userId });

    return response.status(201).send();
  }
}

export { AddBookToLibraryController };
