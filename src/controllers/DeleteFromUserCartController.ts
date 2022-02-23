import writeLog from "@helpers/WriteLog";
import { Request, Response } from "express";
import { DeleteFromUserCartService } from "@services/DeleteFromUserCartService";

export class DeleteFromUserCartController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { token } = req.cookies;
    const { quantity } = req.query;

    const service = new DeleteFromUserCartService();

    try {
      await service.execute(Number(id), token, Number(quantity));
      res.status(201).send({
        success: `Deleted ${
          quantity ? quantity : "all"
        } unit(s) from Product with id ${id} from cart`,
      });
    } catch (error) {
      if (error == "itemnotfound") {
        res.status(401).send({
          error: "Item not found in your cart or your cart are empty",
        });
      } else if (error == "productnotfound") {
        res.status(404).send({ error: "Product not found or doesn't exists" });
      } else {
        writeLog(error, "DeleteFromUserCartController");
        res
          .status(500)
          .send({ error: "An error has occurred check logs for more details" });
      }
    }
  }
}
