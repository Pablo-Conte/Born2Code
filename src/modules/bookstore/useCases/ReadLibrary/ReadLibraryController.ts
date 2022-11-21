import { Request, Response } from "express";
import { container } from "tsyringe";
import { ReadLibraryUseCase } from "./ReadLibraryUseCase";

class ReadLibraryController {
  async control(request: Request, response: Response): Promise<Response> {
    const libraryId = request.headers["x-library-id"] as string;

    const readLibraryUseCase = container.resolve(ReadLibraryUseCase);

    const libraryFound = await readLibraryUseCase.execute({ libraryId });

    return response.status(200).json(libraryFound);
  }
}

export { ReadLibraryController };
