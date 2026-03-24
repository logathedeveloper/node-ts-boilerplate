import { Router } from "express";
import * as controller from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createSchema, updatePofileImageSchema, updateSchema } from "./user.validator";
import { upload } from "../../config/multer"; 

const router = Router();

router.get("/", authMiddleware, controller.getUsers);
router.post("/", authMiddleware, validate(createSchema), controller.createUser);
router.post("/:id", authMiddleware, validate(updateSchema), controller.updateUser);
router.post("/:id/profile-image", authMiddleware, validate(updatePofileImageSchema), upload.single("profileImage"), controller.updateUserProfileImage);

export default router;