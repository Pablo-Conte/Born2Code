import { AppError } from "@shared/errors/appError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteLibraryUseCase } from "./DeleteLibraryUseCase";

class DeleteLibraryController {
  async control(request: Request, response: Response): Promise<Response> {
    if (!request.user.isAdmin)
      throw new AppError("User is not an Admin to do this!", 401);

    const libraryId = request.headers["x-library-id"] as string;
    const deleteLibraryUseCase = container.resolve(DeleteLibraryUseCase);

    await deleteLibraryUseCase.execute({ libraryId });

    return response.status(204).send();
  }
}

export { DeleteLibraryController };
