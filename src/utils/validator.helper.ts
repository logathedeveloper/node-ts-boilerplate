import { Request, Response, NextFunction } from "express";
import { z } from "zod";


export const requiredString = (fieldName: string) =>  z
    .string({ required_error: `${fieldName} is required`, invalid_type_error: `${fieldName} must be a string` })
    .trim()
    .nonempty(`${fieldName} is required`);

export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID");

  export const paginationSchema = z.object({
    query: z.object({
      page: z.coerce.number().min(1).default(1),
      limit: z.coerce.number().min(1).max(100).default(10)
    })
  });

 