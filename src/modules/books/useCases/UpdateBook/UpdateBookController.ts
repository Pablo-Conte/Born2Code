import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "@shared/errors/appError";
import { BookEntity } from "@modules/books/infra/entities/BookEntity";
import { UpdateBookUseCase } from "./UpdateBookUseCase";

class UpdateBookController {
  async control(request: Request, response: Response): Promise<Response> {
    if (!request.user.isAdmin) throw new AppError("You aren't an admin!", 401);

    const bookId = request.headers["x-book-id"] as string;
    const dataBook = request.body as Partial<BookEntity>;
    const updateBookUseCase = container.resolve(UpdateBookUseCase);

    const updatedBook = await updateBookUseCase.execute({ dataBook, bookId });

    return response.status(201).json(updatedBook);
  }
}

export { UpdateBookController };
