import writeLog from "@helpers/WriteLog";
import { Request, Response } from "express";
import { LoginUserService } from "@services/LoginUserService";

export class LoginUserController {
  async handle(req: Request, res: Response) {
    if (!req.headers.authorization) {
      res.status(400).send({ error: "Authorization header missing" });
    } else {
      const [, hash]: any = req.headers.authorization?.split(" ");
      const [email, password] = Buffer.from(hash, "base64")
        .toString()
        .split(":");

      const service = new LoginUserService();

      try {
        const result = await service.execute(email, password);
        res.cookie("token", result.token, {
          maxAge: 86400000, // 1d
          httpOnly: true,
        });
        res.status(201).send(result);
      } catch (err: any) {
        if (err.name == "invalidpass") {
          res
            .status(401)
            .json({
              error: "Invalid password",
              tries: err.tries,
              remaining: err.remaining,
            });
        } else if (err == "invalidjwt") {
          res.status(401).json({ error: "Invalid token" });
        } else if (err == "emailnotfound") {
          res.status(401).json({ error: "Email not found" });
        } else {
          writeLog(err, "LoginUserController");
          res.status(500).json({
            error: "an error has occurred, check logs for more details",
          });
        }
      }
    }
  }
}
