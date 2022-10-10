import { Request, Response } from "express";
import { AppError } from "../../../../shared/errors";
import { DeleteLibraryService } from "./DeleteLibraryService";

class DeleteLibraryController {

    async control(request: Request, response: Response): Promise<Response>{
        
        if (!request.user.isAdmin) throw new AppError("User is not an Admin to do this!", 401);

        const libraryId = request.headers['x-library-id'] as string;
        const deleteLibraryService = new DeleteLibraryService();
        
        await deleteLibraryService.execute({ libraryId });

        return response.status(204).send();
    }
}

export { DeleteLibraryController }