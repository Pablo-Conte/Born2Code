import { Request, Response } from "express";
import { container } from "tsyringe";

import { ToggleAdminService } from "./ToggleAdminService";

class ToggleAdminController {
  async control(request: Request, response: Response): Promise<Response> {
    const { isAdmin } = request.user as unknown as {
      isAdmin: boolean;
      
    };
    const headerUserId = request.headers["x-user-id"] as string;

    const toggleAdminService = container.resolve(ToggleAdminService);

    const result = await toggleAdminService.execute({ isAdmin, headerUserId });

    let returnString: string;
    switch (result) {
      case true:
        returnString = "User is no longer an admin";
        break;
      case false:
        returnString = "User is now an admin!";
        break;
      default:
    }

    return response.status(200).json({ message: `${returnString}` });
  }
}

export { ToggleAdminController };
