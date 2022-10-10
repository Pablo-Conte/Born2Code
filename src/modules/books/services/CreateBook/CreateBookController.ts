import { Request, Response } from "express";
import { BookEntity } from "../../../../database/entities/BookEntity";
import { AppError } from "../../../../shared/errors";
import { CreateBookService } from "./CreateBookService";

class CreateBookController {

    async control(request: Request, response: Response): Promise<Response> {
        
        const dataToCreateBook = request.body;
        const libraryId = request.headers['x-library-id'] as string;
        
        if (!request.user.isAdmin) throw new AppError("You aren't an Admin!", 401);
        if (!libraryId) throw new AppError("Library is not informed", 401);
        
        const createBookService = new CreateBookService();

        const newBook = await createBookService.execute({ dataToCreateBook,  libraryId })

        return response.status(201).json(newBook);
    }
}

export { CreateBookController }