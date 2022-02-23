import { AddNewProductToDatabaseController } from "@app/controllers/AddNewProductToDatabaseController";
import { AddToUserCartController } from "@app/controllers/AddToUserCartController";
import { DeleteFromUserCartController } from "@app/controllers/DeleteFromUserCartController";
import { GetProductDataFromDatabaseController } from "@app/controllers/GetProductDataFromDatabaseController";
import { GetUserCartController } from "@app/controllers/GetUserCartController";
import { RemoveProductDataFromDatabaseController } from "@app/controllers/RemoveProductDataFromDatabaseController";
import { UpdateProductOnDatabaseController } from "@app/controllers/UpdateProductOnDatabaseController";
import { verifyAdmin } from "@app/middlewares/verifyAdmin";
import { verifyLogin } from "@app/middlewares/verifyLogin";
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

router.post(
  "/addtocart/:id",
  verifyLogin,
  new AddToUserCartController().handle
);
router.delete(
  "/removefromcart/:id",
  verifyLogin,
  new DeleteFromUserCartController().handle
);
router.get("/cart", verifyLogin, new GetUserCartController().handle);

export default router;
