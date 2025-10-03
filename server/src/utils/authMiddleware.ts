import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ error: "Missing auth header" });

  const token = header.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Invalid token format" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded; // extend Express.Request type
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
