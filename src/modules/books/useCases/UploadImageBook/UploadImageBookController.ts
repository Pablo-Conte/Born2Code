import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadImageBookUseCase } from "./UploadImageBookUseCase";

class UploadImageBookController {
  async control(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;
    const bookImage = request.file.filename;

    const uploadBookImage = container.resolve(UploadImageBookUseCase);

    const updateBook = await uploadBookImage.execute({
      bookImage,
      userId,
    });

    return response.status(200).json(updateBook);
  }
}

export { UploadImageBookController };
