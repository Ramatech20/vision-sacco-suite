import { Request, Response, NextFunction } from "express";

export function validateRequest(requiredFields: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];
    for (const field of requiredFields) {
      if (typeof req.body[field] === "undefined" || req.body[field] === "") {
        errors.push(`${field} is required`);
      }
    }
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    next();
  };
}
