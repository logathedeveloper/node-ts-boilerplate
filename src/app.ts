import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/error.middleware";
import { httpLogger } from "./middlewares/logger.middleware";
import { apiLimiter } from "./middlewares/rateLimiter.middleware";
import { sanitizeInput } from "./middlewares/sanitize.middleware";
import { errorResponse } from "./utils/response";
import authRoutes from "./modules/auth/auth.routes";
import todoRoutes from "./modules/todos/todo.routes";
import userRoutes from "./modules/users/user.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
// app.use(httpLogger);
app.use(sanitizeInput);

app.use("/api", apiLimiter); 
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/user", userRoutes);

app.use("/health", (req: Request, res: Response) => {
  console.log(`pid ${process.pid}`);
  res.sendStatus(200);
});

app.use("/", (req: Request, res: Response) => {
  errorResponse({
    res,
    message: "Not Found",
    code: "NotFound",
    statusCode: 404,
  });
});

app.use(globalErrorHandler);

export default app;
