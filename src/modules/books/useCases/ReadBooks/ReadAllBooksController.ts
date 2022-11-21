import { Request, Response } from "express";
import { container } from "tsyringe";

import { ReadAllBooksUseCase } from "./ReadAllBooksUseCase";

class ReadBooksController {
  async control(request: Request, response: Response): Promise<Response> {
    const {
      bookId: queryBook,
      library: queryLibrary,
      all,
    } = request.query as unknown as {
      bookId: string;
      library: string;
      all: string;
    };

    const readAllBooksUseCase = container.resolve(ReadAllBooksUseCase);

    const booksFound = await readAllBooksUseCase.execute({
      queryLibrary,
      queryBook,
      all,
    });

    return response.status(200).json(booksFound);
  }
}

export { ReadBooksController };
