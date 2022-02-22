import writeLog from "@helpers/WriteLog";
import { Request, Response } from "express";
import { RemoveProductDataFromDatabaseService } from "@services/RemoveProductDataFromDatabaseService";

export class RemoveProductDataFromDatabaseController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      res.status(400).send({ error: "Please provide an ID" });
    } else {
      const service = new RemoveProductDataFromDatabaseService();

      try {
        const result = await service.execute(Number(id));
        res.status(201).send({ success: "Product deleted" });
      } catch (error) {
        if (error == "notexists") {
          res.status(404).send({ error: "Product not found" });
        } else {
          writeLog(error, "RemoveProductDataFromDatabaseController");
          res.status(500).send({
            error: "An error has occurred check logs for more details",
          });
        }
      }
    }
  }
}
