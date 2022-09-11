import { Request, Response } from "express";
import { ReadUserService } from "../services/ReadUserService";

type TReadUser = {
    userId: string
}

class ReadUserController {
    
    async control(request: Request, response: Response): Promise<Response>{
        
        const { userId } = request.user

        const userIdRead = request.headers["x-user-id"] as string
        
        const readUserService = new ReadUserService();
        
        const User = await readUserService.execute({ myId: userId,  id: userIdRead })

        return response.status(200).json(User)
    }
}

export { ReadUserController }