import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  // Log error (optional: use a logger)
  console.error(err);

  // Set default status and message
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  // Optionally include stack trace in development
  const response: any = { success: false, error: message };
  if (process.env.NODE_ENV === "development" && err.stack) {
    response.stack = err.stack;
  }

  res.status(status).json(response);
}
