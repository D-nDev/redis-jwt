import { AddNewProductToDatabaseController } from "@app/controllers/AddNewProductToDatabaseController";
import { GetProductDataFromDatabaseController } from "@app/controllers/GetProductDataFromDatabaseController";
import { RemoveProductDataFromDatabaseController } from "@app/controllers/RemoveProductDataFromDatabaseController";
import { UpdateProductOnDatabaseController } from "@app/controllers/UpdateProductOnDatabaseController";
import { verifyAdmin } from "@app/middlewares/verifyAdmin";
import { Router } from "express";

const router = Router();

router.post(
  "/newitem",
  verifyAdmin,
  new AddNewProductToDatabaseController().handle
);
router.get(
  "/item/:id",
  verifyAdmin,
  new GetProductDataFromDatabaseController().handle
);
router.delete(
  "/removeitem/:id",
  verifyAdmin,
  new RemoveProductDataFromDatabaseController().handle
);
router.patch(
  "/updateitem/:id",
  verifyAdmin,
  new UpdateProductOnDatabaseController().handle
);

router.post("/addtocart");
router.delete("/removefromcart");
router.get("/cart");

export default router;
