import writeLog from "@helpers/WriteLog";
import { Request, Response } from "express";

export class LogoutController {
  async handle(req: Request, res: Response) {
    try {
      res.clearCookie("token");
      res.status(201).send({ success: "Logout has been successfully" });
    } catch (error) {
      writeLog(error, "LogoutController");
      res
        .status(500)
        .send({ error: "An error has occurred check logs for more details" });
    }
  }
}
