import { z } from "zod";
import { requiredString } from "../../utils/validator.helper";
 
export const createSchema = z.object({
  body: z.object({
    name:  requiredString("Name"),
    email: requiredString("Email").email(),
    password: requiredString("Password").min(6, "Password should be minimum 6 characters" )
  })
});

export const updateSchema = z.object({
  params: z.object({
    id: requiredString("User ID")
  }),
  body: z.object({
    name:  requiredString("Name"),
    email: requiredString("Email").email(),
    password: z.string().min(6, "Password should be minimum 6 characters").optional()
  })
});

export const updatePofileImageSchema = z.object({
  params: z.object({
    id: requiredString("User ID")
  })
  
});