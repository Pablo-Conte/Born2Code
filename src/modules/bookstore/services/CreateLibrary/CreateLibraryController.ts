import { Request, Response } from "express";
import { CreateLibraryService } from "./CreateLibraryService";

class CreateLibraryController {

    async control(request: Request, response: Response): Promise<Response> {

        const { userId } = request.user;

        const { nameLibrary } = request.body;

        const createLibraryService = new CreateLibraryService();

        const library = await createLibraryService.execute({ nameLibrary, userId });

        return response.status(201).json(library);

    }
}

export { CreateLibraryController }