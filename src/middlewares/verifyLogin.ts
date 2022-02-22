import jwt from "jsonwebtoken";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import handleError from "@app/helpers/WriteLog";

export function verifyLogin(req: Request, res: Response, next: NextFunction) {
  const authToken = req.cookies.token;
  if (!authToken) {
    res.status(500).send({ error: "Token not found" });
  } else {
    try {
      jwt.verify(authToken as string, process.env.SECRET as string);
      return next();
    } catch (err: Error | any) {
      handleError(err, "verifyLogin");
      res.status(500).send({ error: "Invalid token" });
    }
  }
}
