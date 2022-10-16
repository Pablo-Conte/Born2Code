import { Request, Response } from "express";
import { ReturnBookService } from "./ReturnBookService";

class ReturnBookController {
    
    async control(request: Request, response: Response): Promise<Response> {

        const userId = request.user.userId
        const returnUserBookId = request.headers['x-return-id'] as string;

        const returnBookService = new ReturnBookService()

        const result = await returnBookService.execute({ returnId: returnUserBookId, userId })

        return response.status(200).json(result)
    }
}

export { ReturnBookController }