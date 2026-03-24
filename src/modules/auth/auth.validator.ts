import { z } from "zod";
import { requiredString } from "../../utils/validator.helper";

export const registerSchema = z.object({
  body: z.object({
    name:  requiredString("Name"),
    email: requiredString("Email").email(),
    password: requiredString("Password").min(6, "Password should be minimum 6 characters" )
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: requiredString("Email").email(),
    password: requiredString("Password").min(6, "Password should be minimum 6 characters" )
  })
});

export const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string()
  })
});