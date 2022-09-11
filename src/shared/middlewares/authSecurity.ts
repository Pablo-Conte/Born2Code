import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import auth from "../../settings/auth";
import { AppError } from "../errors";

export async function authSecurity(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    
    if(!authHeader) {
        throw new AppError("Token not found", 401)
    }

    const [ ,token] = authHeader.split(" ");

    try {
        const { sub: id } = verify(token, auth.secret) as { sub: string };

        request.user = {
            id
        };

        next();
    } catch (error) {
        throw new AppError("Invalid token!", 401)
    }
}