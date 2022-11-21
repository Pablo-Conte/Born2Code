import { AppError } from "@shared/errors/appError";
import { NextFunction, Request, Response } from "express";

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

  return response.status(500).json({
    status: "Error",
    message: `Internal Server Error, error: ${err}`,
  });
}
