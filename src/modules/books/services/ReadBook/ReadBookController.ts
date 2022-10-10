import { Request, Response } from "express";
import { AppError } from "../../../../shared/errors";
import { ReadBookService } from "./ReadBookService";

class ReadBookController {

    async control(request:Request, response: Response): Promise<Response>{

        const bookId = request.headers['x-book-id'] as string;

        if (!bookId) throw new AppError("book ID not found", 404);

        const readBookService = new ReadBookService();

        const bookFound = await readBookService.execute({ id: bookId });

        return response.status(200).json(bookFound)
    }
}

export { ReadBookController }