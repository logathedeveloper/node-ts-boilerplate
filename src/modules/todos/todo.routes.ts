import { Router } from "express";
import * as controller from "./todo.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createSchema } from "./todo.validator";

const router = Router();

router.get("/", authMiddleware, controller.getTodos);
router.post("/", authMiddleware, validate(createSchema), controller.createTodo);

export default router;