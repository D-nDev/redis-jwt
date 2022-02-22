import jwt from "jsonwebtoken";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import handleError from "@app/helpers/WriteLog";

export function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  const authToken = req.cookies.token;
  if (!authToken) {
    res.status(500).send({ error: "Token not found" });
  } else {
    try {
      const admintoken: any = jwt.verify(
        authToken as string,
        process.env.SECRET as string
      );
      if (admintoken.type != "admin") {
        res.status(401).send({ error: "Unauthorized" });
      }
      return next();
    } catch (err: Error | any) {
      handleError(err, "verifyAdmin");
      res.status(500).send({ error: "Invalid token" });
    }
  }
}
