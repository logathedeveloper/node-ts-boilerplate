import multer from "multer";
import path from "path";
import { AppError } from "../utils/AppError";

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp"
];

const storage = multer.diskStorage({
  destination: "src/uploads/images",
  filename: (_req: any, file: any , cb: any) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const fileFilter: multer.Options["fileFilter"] = (__req: any, file: any, cb: any) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError("Invalid file type", 422, "InvalidFileType", "Only JPEG, PNG, and WEBP images are allowed"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024
  }
});