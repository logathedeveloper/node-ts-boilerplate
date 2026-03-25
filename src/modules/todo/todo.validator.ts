import { z } from "zod";
import { requiredString, objectIdSchema } from "../../utils/validator.helper";

export const createSchema = z.object({
  body: z.object({
    title: requiredString("Title"),
    description: requiredString("Description"),
    userId: objectIdSchema("User Id")
  })
});

export const updateSchema = z.object({
  params : z.object({
    id : objectIdSchema("Todo Id")
  }),
  body: z.object({
    title: requiredString("Title"),
    description: requiredString("Description"),
    userId: requiredString("User Id"),
    completed : z.boolean().optional()
  })
});

export const deleteSchema = z.object({
  params : z.object({
    id : objectIdSchema("Todo Id")
  }),
});
