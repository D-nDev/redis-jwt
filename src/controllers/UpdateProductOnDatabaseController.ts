import writeLog from "@helpers/WriteLog";
import { Request, Response } from "express";
import { UpdateProductOnDatabaseService } from "@services/UpdateProductOnDatabaseService";

export class UpdateProductOnDatabaseController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    const { description } = req.body;
    const { price } = req.body;

    const service = new UpdateProductOnDatabaseService();

    try {
      const result = await service.execute(
        Number(id),
        name,
        description,
        price
      );
      res.status(201).send(result);
    } catch (error) {
      if (error == "notexists") {
        res.status(404).send({ error: "Product not found" });
      } else {
        writeLog(error, "UpdateProductOnDatabaseController");
        res
          .status(500)
          .send({ error: "An error has occurred check logs for more details" });
      }
    }
  }
}
