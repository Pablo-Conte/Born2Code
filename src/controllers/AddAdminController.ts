import { Request, Response } from "express";
import { AddAdminService } from "../services/AddAdminService";

class AddAdminController {

    async control(request: Request, response: Response): Promise<Response> {
        
        const { userId } = request.user;
        
        const headerUserId = request.headers["x-user-id"] as string;

        const addAdminService = new AddAdminService();

        const addAdmin = await addAdminService.execute({ userId, headerUserId });

        return response.status(204).send();
    }
}

export { AddAdminController };