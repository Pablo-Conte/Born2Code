import { Request, Response } from "express";

import { ReadLibraryService } from "./ReadLibraryService";

class ReadLibraryController {
  async control(request: Request, response: Response): Promise<Response> {
    const libraryId = request.headers["x-library-id"] as string;

    const readLibraryService = new ReadLibraryService();

    const libraryFound = await readLibraryService.execute({ libraryId });

    return response.status(200).json(libraryFound);
  }
}

export { ReadLibraryController };
