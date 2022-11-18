/* eslint-disable eqeqeq */
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { TokenRepository } from "../../modules/sessions/infra/repositories/implementations/TokenRepository";
import { UsersRepository } from "../../modules/accounts/infra/repositories/implementations/UsersRepository";
import auth from "../../settings/auth";
import { AppError } from "../errors/appError";

type tokenAuth = {
  sub: string;
};

export async function authSecurity(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const tokensRepository = new TokenRepository();
  const usersRepository = new UsersRepository();

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token not found", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(token, auth.secret) as tokenAuth;
    const { token: tokenDB } = await tokensRepository.findByUserId({
      userId,
    });

    const { admin: isAdmin } = await usersRepository.findById({ id: userId });

    if (token != tokenDB) {
      throw new Error();
    }

    request.user = {
      userId,
      isAdmin,
    };

    next();
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }
}
