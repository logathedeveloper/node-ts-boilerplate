import { Router } from "express";
import * as controller from "./todo.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createSchema, updateSchema, deleteSchema } from "./todo.validator";

const router = Router();

router.use("/", authMiddleware)
router.get("/", controller.getTodos);
router.post("/", validate(createSchema), controller.createTodo);
router.post("/:id", validate(updateSchema), controller.updateTodo);
router.delete("/:id", validate(deleteSchema), controller.deleteTodo);

export default router;