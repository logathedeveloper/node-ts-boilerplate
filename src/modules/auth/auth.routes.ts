import { Router } from "express";
import * as controller from "./auth.controller";
import { loginSchema, refreshSchema, registerSchema } from "./auth.validator";
import { validate } from "../../middlewares/validate.middleware";

const router = Router();

router.post("/register", validate(registerSchema), controller.register);
router.post("/login", validate(loginSchema), controller.login);
router.post("/refresh", validate(refreshSchema), controller.refresh);

export default router;