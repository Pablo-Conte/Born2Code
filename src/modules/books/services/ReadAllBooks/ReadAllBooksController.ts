import { Request, Response } from "express";
import { ReadAllBooksService } from "./ReadAllBooksService";

class ReadAllBooksController {

    async control(request: Request, response: Response): Promise<Response> {

        const query = request.query['library'] as string;

        const readAllBooksService = new ReadAllBooksService();

        const booksFound = await readAllBooksService.execute({ query });

        return response.status(201).json(booksFound);
    }
}

export { ReadAllBooksController }