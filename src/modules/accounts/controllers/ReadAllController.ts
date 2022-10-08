import { Request, Response } from "express";
import { ReadAllService } from "../services/ReadAllService";

class ReadAllController {

    async control(request: Request, response: Response): Promise<Response> {

        const { userId } = request.user;

        const readAllService = new ReadAllService();

        const users = await readAllService.execute({ userId })

        return response.status(201).json(users)
    }
}

export { ReadAllController };