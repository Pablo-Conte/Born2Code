import { Request, Response } from "express";

import { AppError } from "../../../../shared/errors/appError";
import { CreateLibraryService } from "./CreateLibraryService";

class CreateLibraryController {
  /**
   * Verify if is admin
   * get request body
   * execute createLibraryService
   */

  async control(request: Request, response: Response): Promise<Response> {
    const { isAdmin, userId } = request.user;

    if (!isAdmin) throw new AppError("You aren't and admin to do that", 401);

    const { nameLibrary } = request.body;

    const createLibraryService = new CreateLibraryService();
   
    const library = await createLibraryService.execute({ nameLibrary, userId });

    return response.status(201).json(library);
  }
}

export { CreateLibraryController };
