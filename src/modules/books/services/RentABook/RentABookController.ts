import { Request, Response } from "express";
import { RentABookService } from "./RentABookService";

class RentABookController {

    async control(request: Request, response: Response): Promise<Response> {

        const { userId }  = request.user
        const bookId = request.headers['x-book-id'] as string;

        const rentABookService = new RentABookService();

        await rentABookService.execute({ bookId, userId })

        return response.status(200).send();
    }
}

export { RentABookController }