import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";

export const validate = (schema: ZodSchema) => 
    (req: any, res: Response, next: NextFunction) => {
       
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query
    }); 
    if (!result.success) {
        const formattedErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[1] || issue.path[0];
        formattedErrors[field] = issue.message;
      }); 

      return errorResponse({
        res,
        message: "Validation Error",
        code: "ValidationError",
        statusCode: 422,
        details: formattedErrors,
      }) 
    }

    req.body = result.data.body;
    req.params = result.data.params;
    req.query = result.data.query;

    next();
  };