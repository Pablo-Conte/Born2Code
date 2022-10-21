import { Request, Response } from "express";

import { AppError } from "../../../../shared/errors/appError";
import { AddBookToLibraryService } from "./AddBookToLibraryService";

class AddBookToLibraryController {
  async control(request: Request, response: Response): Promise<Response> {
    if (!request.user.isAdmin) throw new AppError("You aren't and admin!", 401);

    const bookId = request.headers["x-book-id"] as string;
    const libraryId = request.headers["x-library-id"] as string;

    if (!bookId || !libraryId)
      throw new AppError("You forgot the data man!", 404);

    const addBookToLibrary = new AddBookToLibraryService();

    await addBookToLibrary.execute({ bookId, libraryId });

    return response.status(201).send();
  }
}

export { AddBookToLibraryController };
