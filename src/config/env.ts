import { z } from "zod";
import dotenv from "dotenv"; 

dotenv.config();

const envSchema = z.object({
  APP_NAME : z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().default("5000"),
  MONGO_URI: z.string().nonempty("MONGO_URI is required"),
  JWT_SECRET: z.string().nonempty(),
  JWT_REFRESH_SECRET: z.string().nonempty(),
  ENABLE_CLUSTER: z.enum(["true", "false"]).transform((val) => val === "true").default("false"),
  DEFAULT_PAGE_SIZE: z.number().default(15),
  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.coerce.number().default(6379),
  MAIL_HOST : z.string().default("smtp.example.com"),
  MAIL_PORT : z.string().default("587"),
  MAIL_USERNAME : z.string().default("test@example.com"),
  MAIL_PASSWORD : z.string().default("test@123")
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:");
  console.error(parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;