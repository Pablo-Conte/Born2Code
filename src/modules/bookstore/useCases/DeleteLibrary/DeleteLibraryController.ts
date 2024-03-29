import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../shared/errors/appError";
import { DeleteLibraryService } from "./DeleteLibraryService";

class DeleteLibraryController {
  /**
   * Verify if is admin
   * get request headers
   * execute deleteLibraryService
   */

  async control(request: Request, response: Response): Promise<Response> {
    if (!request.user.isAdmin)
      throw new AppError("User is not an Admin to do this!", 401);

    const libraryId = request.headers["x-library-id"] as string;
    const deleteLibraryService = container.resolve(DeleteLibraryService);

    await deleteLibraryService.execute({ libraryId });

    return response.status(204).send();
  }
}

export { DeleteLibraryController };
