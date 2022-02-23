import writeLog from "@helpers/WriteLog";
import { Request, Response } from "express";
import { AddToUserCartService } from "@services/AddToUserCartService";

export class AddToUserCartController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { token } = req.cookies;

    const service = new AddToUserCartService();

    try {
      await service.execute(Number(id), token);
      res.status(201).send({ success: `Product with id ${id} added to cart` });
    } catch (error) {
      if (error == "invalidtoken") {
        res.status(401).send({ error: "Invalid token" });
      } else if (error == "productnotfound") {
        res.status(404).send({ error: "Product not found" });
      } else {
        writeLog(error, "AddNewProductToDatabaseController");
        res
          .status(500)
          .send({ error: "An error has occurred check logs for more details" });
      }
    }
  }
}
