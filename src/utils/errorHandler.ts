/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

import { AppError } from "../shared/errors/appError";

export function errorHandler(
  err: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  // Existem mais tipos de erro se quisermos...

  return response.status(500).json({
    status: "Error",
    message: `Internal Server Error, error: ${err}`,
  });
}
