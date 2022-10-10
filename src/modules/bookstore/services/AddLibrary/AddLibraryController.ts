import { Request, Response } from "express";
import { AddLibraryService } from "./AddLibraryService";

class AddLibraryController {

    async control(request: Request, response: Response): Promise<Response> {

        const { userId } = request.user;

        const { nameLibrary } = request.body;

        const addLibraryService = new AddLibraryService();

        const library = await addLibraryService.execute({ nameLibrary, userId });

        return response.status(201).json(library);

    }
}

export { AddLibraryController }