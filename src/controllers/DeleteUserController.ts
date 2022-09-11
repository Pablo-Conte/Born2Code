import { Request, Response } from "express";
import { DeleteUserService } from "../services/DeleteUserService";

class DeleteUserController{
    async control(request: Request, response: Response): Promise<Response> {

        const { id } = request.user;

        const deleteUserService = new DeleteUserService();

        const deleteUser = await deleteUserService.execute( { id } )

        return response.status(204).send();
    }
}

export { DeleteUserController };