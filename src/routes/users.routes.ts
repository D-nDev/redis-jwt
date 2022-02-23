import { LoginUserController } from "@app/controllers/LoginUserController";
import { LogoutController } from "@app/controllers/LogoutController";
import { RegisterUserController } from "@app/controllers/RegisterUserController";
import { Router } from "express";

const router = Router();

router.post("/login", new LoginUserController().handle);
router.post("/register", new RegisterUserController().handle);
router.post("/logout", new LogoutController().handle);

export default router;
