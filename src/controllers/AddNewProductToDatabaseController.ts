import writeLog from "@helpers/WriteLog";
import { Request, Response } from "express";
import { AddNewProductToDatabaseService } from "@services/AddNewProductToDatabaseService";

export class AddNewProductToDatabaseController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;
    const { description } = req.body;
    const { price } = req.body;

    const service = new AddNewProductToDatabaseService();

    try {
      const result = await service.execute(name, description, price);
      res.status(201).send(result);
    } catch (error) {
      writeLog(error, "AddNewProductToDatabaseController");
      res
        .status(500)
        .send({ error: "An error has occurred check logs for more details" });
    }
  }
}
