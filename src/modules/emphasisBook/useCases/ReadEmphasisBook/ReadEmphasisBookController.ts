import { Request, Response } from "express";

import { ReadEmphasisBookUseCase } from "./ReadEmphasisBookUseCase";

class ReadEmphasisBookController {
  async control(request: Request, response: Response): Promise<Response> {
    const readEmphasisBookUseCase = new ReadEmphasisBookUseCase();

    const emphasisBooks = await readEmphasisBookUseCase.execute();

    return response.status(200).json(emphasisBooks);
  }
}

export { ReadEmphasisBookController };
