import { Request, Response, } from "express";
import { UserLogoutService } from "../services/UserLogoutService";

class LogoutUserController{

    async control(request: Request, response: Response): Promise<Response> {
        
        const { userId } = request.user;
        
        const userLogoutService = new UserLogoutService()

        await userLogoutService.execute({ userId: userId })
        const header = request.headers.authorization
        
        const [, token] = header.split(" ")
        console.log(token)
        
        return response.status(204).send()

    }
}

export { LogoutUserController };