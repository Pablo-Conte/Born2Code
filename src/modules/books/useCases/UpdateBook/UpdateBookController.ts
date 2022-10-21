import { Request, Response } from "express";

import { AppError } from "../../../../shared/errors/appError";
import { BookEntity } from "../../infra/entities/BookEntity";
import { UpdateBookService } from "./UpdateBookService";

class UpdateBookController {
  async control(request: Request, response: Response): Promise<Response> {
    if (!request.user.isAdmin) throw new AppError("You aren't an admin!", 401);

    const bookId = request.headers["x-book-id"] as string;
    const dataBook = request.body as Partial<BookEntity>;
    const updateBookService = new UpdateBookService();

    const updatedBook = await updateBookService.execute({ dataBook, bookId });

    return response.status(201).json(updatedBook);
  }
}

export { UpdateBookController };
