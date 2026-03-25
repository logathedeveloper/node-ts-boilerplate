import { errorResponse } from "../utils/response";
import { AppError } from "../utils/AppError";
import multer from "multer";
import { env } from "../config/env";

export const globalErrorHandler = (err: any, req: any, res: any, next: any) => {
  if (env.NODE_ENV == "development") console.log(err);

  if (err instanceof AppError) {
    return errorResponse({
      res,
      message: err.message,
      code: err.code,
      statusCode: err.statusCode,
      details: err.details,
    });
  }

  // Multer size error
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return errorResponse({
        res,
        message: "Invalid file size",
        code: "FileTooLarge",
        statusCode: 422,
        details: "File size must be less than 2MB",
      });
    }
  }

  if (err instanceof Error) {
    return errorResponse({
      res,
      message: err.message,
      code: "InternalServerError",
      statusCode: 500,
      details: "An internal server error occured",
    });
  }

  // Unknown errors
  errorResponse({
    res,
    message: "Internal Server Error",
    code: "InternaleSearverError",
    statusCode: 500,
  });
};
