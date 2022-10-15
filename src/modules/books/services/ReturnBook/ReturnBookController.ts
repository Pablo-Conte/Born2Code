import { Request, Response } from "express";
import { ReturnBookService } from "./ReturnBookService";

class ReturnBookController {
    
    async control(request: Request, response: Response): Promise<Response> {

        const userId = request.user.userId;
        const bookId = request.headers['x-book-id'] as string;

        const returnBookService = new ReturnBookService()

        const result = await returnBookService.execute({ userId, bookId })

        return response.status(200).json({
            TotalValor: result
        })
    }
}

export { ReturnBookController }