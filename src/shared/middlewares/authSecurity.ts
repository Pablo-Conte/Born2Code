import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { TokenRepository } from "../../database/repositories/TokenRepository";
import auth from "../../settings/auth";
import { AppError } from "../errors";

type tokenAuth = {
    sub: string
}

export async function authSecurity(request: Request, response: Response, next: NextFunction) {
    
    const tokensRepository = new TokenRepository();

    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("Token not found", 401)
    }
    
    const [ ,token] = authHeader.split(" ");

    try {

        const { sub: userId } = verify(token, auth.secret) as tokenAuth; //definindo o tipo
        //const { sub: id } = verify(token, auth.secret) as { sub: string };
        const { token: tokenDB } = await tokensRepository.findByUserId({ userId: userId})
        
        if (token != tokenDB) {
            throw new Error();
        };

        request.user = {
            userId
        };

        next();
        
    } catch (error) {
        throw new AppError("Invalid token!", 401)
    }
}