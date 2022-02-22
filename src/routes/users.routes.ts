import { LoginUserController } from "@app/controllers/LoginUserController";
import { RegisterUserController } from "@app/controllers/RegisterUserController";
import { Router } from "express";

const router = Router();

router.post("/login", new LoginUserController().handle);
router.post("/register", new RegisterUserController().handle);

export default router;
