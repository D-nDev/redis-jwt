import writeLog from "@helpers/WriteLog";
import { Request, Response } from "express";
import { GetUserCartService } from "@services/GetUserCartService";

export class GetUserCartController {
  async handle(req: Request, res: Response) {
    const { token } = req.cookies;

    const service = new GetUserCartService();

    try {
      const result = await service.execute(token);
      res.status(201).send(result);
    } catch (error) {
      if (error == "nocart") {
        res.status(404).send({ error: "Empty cart" });
      } else {
        writeLog(error, "GetUserCartController");
        res
          .status(500)
          .send({ error: "An error has occurred check logs for more details" });
      }
    }
  }
}
