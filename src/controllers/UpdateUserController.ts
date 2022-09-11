import { Request, Response } from "express";
import { UserEntity } from "../database/entities/UserEntity";
import { UpdateUserService } from "../services/UpdateUserService";

class UpdateUserController {

    async control (request: Request, response: Response): Promise<Response> {
        
        const { userId }  = request.user;   
        const userData = request.body as Partial<UserEntity>;

        const updateUserService = new UpdateUserService();
        
        const updatedUser = await updateUserService.execute({ id: userId, userData })
        
        return response.status(200).json(updatedUser)
    }
}

export { UpdateUserController };