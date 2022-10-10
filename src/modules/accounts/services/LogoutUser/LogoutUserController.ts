import { Request, Response, } from "express";
import { UserLogoutService } from "./UserLogoutService";

class LogoutUserController {

    async control(request: Request, response: Response): Promise<Response> {

        const { userId } = request.user;

        const userLogoutService = new UserLogoutService()

        await userLogoutService.execute({ userId: userId })
        const header = request.headers.authorization

        return response.status(204).send()

    }
}

export { LogoutUserController };