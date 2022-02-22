import { Router } from "express";

const router = Router();

router.post("/newitem");
router.get("/item");
router.delete("/removeitem");
router.patch("/updateitem");

router.post("/addtocart");
router.delete("/removefromcart");
router.get("/cart");

export default router;
