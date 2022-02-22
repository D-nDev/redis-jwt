import writeLog from "@helpers/WriteLog";
import { Request, Response } from "express";
import { RegisterUserService } from "@services/RegisterUserService";

export class RegisterUserController {
  async handle(req: Request, res: Response) {
    const { email } = req.body;
    const { name } = req.body;
    const { password } = req.body;

    const service = new RegisterUserService();

    try {
      const result = await service.execute(email, name, password);
      res.status(201).send(result);
    } catch (error) {
      writeLog(error, "RegisterUserController");
      res
        .status(500)
        .send({ error: "An error has occurred check logs for more details" });
    }
  }
}
