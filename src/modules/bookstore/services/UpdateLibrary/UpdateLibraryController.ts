import { Request, Response } from "express";
import { LibraryEntity } from "../../../../database/entities/LibraryEntity";
import { AppError } from "../../../../shared/errors";
import { UpdateLibraryService } from "./UpdateLibraryService";

class UpdateLibraryController {
    
    async control(request: Request, response: Response): Promise<Response> {
        
        if (!request.user.isAdmin) throw new AppError("User is not an Admin to do this!", 401);

        const updateLibraryService = new UpdateLibraryService();

        const dataToChangeOnLibrary = request.body as Partial<LibraryEntity>;
        const libraryId = request.headers['x-library-id'] as string;

        const updatedLibrary = await updateLibraryService.execute({ data: dataToChangeOnLibrary, libraryId });

        return response.status(201).json(updatedLibrary)

    }
}

export { UpdateLibraryController }