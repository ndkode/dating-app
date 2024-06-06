import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  jwtPayload?: jwt.JwtPayload | string;
}

export default (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decodedToken = jwt.verify(
      String(token),
      String(process.env.JWT_SECRET)
    );
    if (decodedToken) {
      req.jwtPayload = decodedToken;
    } else {
      throw new Error("Invalid request!");
    }
    next();
  } catch (error) {
    res.status(401).json({
      reason: error,
    });
  }
};
