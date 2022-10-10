import { Request, Response } from "express";
import { AppError } from "../../../../shared/errors";
import { DeleteBookService } from "./DeleteBookService";

class DeleteBookController {
    
    async control(request: Request, response: Response): Promise<Response> {

        if (!request.user.isAdmin) throw new AppError("User isn't an admin to do this!", 401)

        const idToDelete = request.headers['x-book-id'] as string;
        
        const deleteBookService = new DeleteBookService();
        
        await deleteBookService.execute({ id: idToDelete });

        return response.status(200).send()
    }
}

export { DeleteBookController }