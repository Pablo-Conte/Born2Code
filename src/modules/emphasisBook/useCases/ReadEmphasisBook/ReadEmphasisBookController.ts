import { Request, Response } from "express";
import { container } from "tsyringe";
import { ReadEmphasisBookUseCase } from "./ReadEmphasisBookUseCase";

class ReadEmphasisBookController {
  async control(request: Request, response: Response): Promise<Response> {
    const readEmphasisBookUseCase = container.resolve(ReadEmphasisBookUseCase);

    const emphasisBooks = await readEmphasisBookUseCase.execute();

    return response.status(200).json(emphasisBooks);
  }
}

export { ReadEmphasisBookController };
