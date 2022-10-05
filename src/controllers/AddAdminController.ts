import { Request, Response } from "express";
import { AddAdminService } from "../services/AddAdminService";

class AddAdminController {

    async control(request: Request, response: Response): Promise<void> {
        
        const { userId } = request.user;
        const headerUserId = request.header['x-user-id'] as string;

        const addAdminService = new AddAdminService();

        addAdminService.execute({ userId, headerUserId });

    }
}

export { AddAdminController };