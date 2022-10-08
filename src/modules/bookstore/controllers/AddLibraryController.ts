import { Request, Response } from "express";
import { AppError } from "../../../shared/errors";
import { AddLibraryService } from "../services/AddLibraryService";


class AddLibraryController {
    
    async control(request: Request, response: Response): Promise<Response> {

        const { nameBook } = request.body;

        if (!nameBook) {
            throw new AppError("Invalid name, try again!", 400)
        }

        const addBookService = new AddLibraryService();

        const book = addBookService.execute({ nameBook });

        return response.status(201).json(book);

    }
}

export { AddLibraryController }