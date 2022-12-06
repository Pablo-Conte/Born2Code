import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadAvatarUseCase } from "./UploadAvatarUseCase";

class UploadAvatarController {
  async control(request: Request, response: Response): Promise<Response> {
    const { userId } = request.user;
    const avatar = request.file.filename;

    const uploadAvatarUseCase = container.resolve(UploadAvatarUseCase);
    const updateUser = await uploadAvatarUseCase.execute({
      avatar,
      userId,
    });

    return response.status(200).json(updateUser);
  }
}

export { UploadAvatarController };
