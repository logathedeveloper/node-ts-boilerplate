import { z } from "zod"; 

export const requiredString = (fieldName: string) =>  z
    .string({ required_error: `${fieldName} is required`, invalid_type_error: `${fieldName} must be a string` })
    .trim()
    .nonempty(`${fieldName} is required`);

 
  export const paginationSchema = z.object({
    query: z.object({
      page: z.coerce.number().min(1).default(1),
      limit: z.coerce.number().min(1).max(100).default(10)
    })
  });

 export const objectIdSchema = (fieldName: string) => z.string().regex(/^[a-fA-F0-9]{24}$/, {
  message: `Invalid ${fieldName}`,
});