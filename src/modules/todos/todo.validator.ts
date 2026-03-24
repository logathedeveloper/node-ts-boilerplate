import { z } from "zod";
import { requiredString } from "../../utils/validator.helper";

export const createSchema = z.object({
  body: z.object({
    title: requiredString("Title"),
    description: requiredString("Description")
  })
});
