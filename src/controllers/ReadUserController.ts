import { Request, Response } from "express";
import { ReadUserService } from "../services/ReadUserService";

type TReadUser = {
    id: string
}

class ReadUserController {
    async control(request: Request, response: Response): Promise<Response>{
        const { id } = request.user
        
        const readUserService = new ReadUserService();

        const User = await readUserService.execute({ id })

        return response.status(200).json(User)
    }
}

export { ReadUserController }