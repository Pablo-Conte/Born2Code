import { Request, Response } from "express";
import { container } from "tsyringe";
import { ReturnBookService } from "./ReturnBookService";

class ReturnBookController {
  async control(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;
    const returnUserBookId = request.headers["x-rentuserlibrarybook-id"] as string;
    
    const returnBookService = container.resolve(ReturnBookService);
    
    const result = await returnBookService.execute({
      returnId: returnUserBookId,
      userId,
    });

    return response.status(200).json(result);
  }
}

export { ReturnBookController };
