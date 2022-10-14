import { Request, Response } from "express";
import { ReadAllBooksService } from "./ReadAllBooksService";

class ReadAllBooksController {

    async control(request: Request, response: Response): Promise<Response> {

        const queryBook = request.query['bookId'] as string;
        const queryLibrary = request.query['library'] as string;

        const readAllBooksService = new ReadAllBooksService();

        const booksFound = await readAllBooksService.execute({ queryLibrary, queryBook });

        return response.status(200).json(booksFound);
    }
}

export { ReadAllBooksController }