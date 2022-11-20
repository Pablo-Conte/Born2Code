import { Request, Response } from "express";

import { RentABookService } from "./RentABookService";

class RentABookController {
  async control(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;
    const library_bookId = request.headers["x-librarybook-id"] as string;

    const rentABookService = new RentABookService();

    await rentABookService.execute({ library_bookId, userId });

    return response.status(204).send();
  }
}

export { RentABookController };
