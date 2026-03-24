import { errorResponse } from "../utils/response";
import { AppError } from "../utils/AppError";
import multer from "multer";

export const globalErrorHandler = (err : any, req: any, res: any, next: any) => {

  console.error(err);

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
        statusCode:  400,
        details: "File size must be less than 2MB",
      }); 
    }
  }


  // Unknown errors
  errorResponse({
    res,
    message: "Internal Server Error",
    code: "InternaleSearverError",
    statusCode: 500,
  });
};