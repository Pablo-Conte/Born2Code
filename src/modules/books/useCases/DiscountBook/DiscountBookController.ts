import { Request, Response } from "express";
import { container } from "tsyringe";
import { DiscountBookUseCase } from "./DiscountBookUseCase";

class DiscountBookController {
  async control(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;
    const { percentage } = request.body;
    const bookId = request.headers["x-book-id"] as string;

    const discountBookUseCase = container.resolve(DiscountBookUseCase);

    const discountApplicated = await discountBookUseCase.execute({
      bookId,
      userId,
      percentage,
    });

    return response.status(200).json(discountApplicated);
  }
}

export { DiscountBookController };
