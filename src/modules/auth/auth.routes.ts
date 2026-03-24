import { Router } from "express";
import * as controller from "./auth.controller";
import { loginSchema } from "./auth.validator";
import { validate } from "../../middlewares/validate.middleware";

const router = Router();

router.post("/register", controller.register);
router.post("/login", validate(loginSchema), controller.login);
router.post("/refresh", controller.refresh);

export default router;