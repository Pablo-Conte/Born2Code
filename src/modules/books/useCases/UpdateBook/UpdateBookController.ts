import { Request, Response } from "express";
import { container } from "tsyringe";
import { BookEntity } from "@modules/books/infra/entities/BookEntity";
import { UpdateBookUseCase } from "./UpdateBookUseCase";

class UpdateBookController {
  async control(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;
    const bookId = request.headers["x-book-id"] as string;
    const dataBook = request.body as Partial<BookEntity>;

    const updateBookUseCase = container.resolve(UpdateBookUseCase);
    const updatedBook = await updateBookUseCase.execute({
      dataBook,
      bookId,
      userId,
    });

    return response.status(201).json(updatedBook);
  }
}

export { UpdateBookController };
