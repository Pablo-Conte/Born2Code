import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadImageBookUseCase } from "./UploadImageBookUseCase";

class UploadImageBookController {
  async control(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;
    const bookImage = request.file.filename;
    const bookId = request.headers["x-book-id"] as string;

    const uploadBookImage = container.resolve(UploadImageBookUseCase);

    const updateBook = await uploadBookImage.execute({
      bookImage,
      bookId,
      userId,
    });

    return response.status(200).json(updateBook);
  }
}

export { UploadImageBookController };
