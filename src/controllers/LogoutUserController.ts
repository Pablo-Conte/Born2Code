import { Request, Response, } from "express";



class LogoutUserController{

    async control(request: Request, response: Response): Promise<Response> {
        const header = request.headers.authorization
        
        const [, token] = header.split(" ")
        console.log(token)
        

        return response.status(204).send();
    }
}

export { LogoutUserController };