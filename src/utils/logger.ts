import pino from "pino";

export const logger = pino({
  level: "info",
  transport: {
    target: "pino-pretty", // dev only
    options: { colorize: true },
  },
});