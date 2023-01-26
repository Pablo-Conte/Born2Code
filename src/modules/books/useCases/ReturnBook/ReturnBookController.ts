import { Request, Response } from "express";
import { container } from "tsyringe";
import { ReturnBookUseCase } from "./ReturnBookUseCase";

class ReturnBookController {
  async control(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;
    const { percentage } = request.body;
    const returnUserBookId = request.headers[
      "x-rentuserlibrarybook-id"
    ] as string;

    const returnBookService = container.resolve(ReturnBookUseCase);
    const result = await returnBookService.execute({
      returnId: returnUserBookId,
      userId,
      percentage,
    });

    return response.status(200).json(result);
  }
}

export { ReturnBookController };
