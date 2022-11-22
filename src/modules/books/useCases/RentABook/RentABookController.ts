import { Request, Response } from "express";
import { container } from "tsyringe";
import { RentABookUseCase } from "./RentABookUseCase";

class RentABookController {
  async control(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;
    const library_bookId = request.headers["x-librarybook-id"] as string;

    const rentABookUseCase = container.resolve(RentABookUseCase);

    await rentABookUseCase.execute({ library_bookId, userId });

    return response.status(200).send();
  }
}

export { RentABookController };
