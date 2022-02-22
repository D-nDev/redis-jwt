import writeLog from "@helpers/WriteLog";
import { Request, Response } from "express";
import { GetProductDataFromDatabaseService } from "@services/GetProductDataFromDatabaseService";

export class GetProductDataFromDatabaseController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({ error: "Please provide an ID" });
    } else {
      const service = new GetProductDataFromDatabaseService();

      try {
        const result = await service.execute(Number(id));
        if (!result) {
          res.status(404).send({ error: "Product not found" });
        } else {
          res.status(201).send(result);
        }
      } catch (error) {
        writeLog(error, "GetProductDataFromDatabaseController");
        res
          .status(500)
          .send({ error: "An error has occurred check logs for more details" });
      }
    }
  }
}
