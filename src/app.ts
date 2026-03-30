import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/error.middleware";
import { httpLogger } from "./middlewares/logger.middleware";
import { apiLimiter } from "./middlewares/rateLimiter.middleware";
import { sanitizeInput } from "./middlewares/sanitize.middleware";
import { errorResponse } from "./utils/response";
import authRoutes from "./modules/auth/auth.routes";
import todoRoutes from "./modules/todo/todo.routes";
import userRoutes from "./modules/user/user.routes";
import { env } from "./config/env";
import swaggerUi from "swagger-ui-express"; 
import { swaggerDocument,swaggerOptions } from "./swagger";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
// app.use(httpLogger);
app.use(sanitizeInput);

app.use("/api", apiLimiter); 
app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);
app.use("/api/user", userRoutes);

app.use("/health", (req: Request, res: Response) => {
  console.log(`pid ${process.pid}`);
  res.sendStatus(200);
});


if (env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
}

app.use((req: Request, res: Response) => {
  errorResponse({
    res,
    message: "Not Found",
    code: "NotFound",
    statusCode: 404,
  });
});

app.use(globalErrorHandler);


export default app;
