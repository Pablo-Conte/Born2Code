import { Request, Response } from "express";

import { ReadBooksService } from "./ReadAllBooksService";

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

    const readAllBooksService = new ReadBooksService();

    const booksFound = await readAllBooksService.execute({
      queryLibrary,
      queryBook,
      all,
    });

    return response.status(200).json(booksFound);
  }
}

export { ReadBooksController };
