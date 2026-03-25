import rateLimit from "express-rate-limit";
import { RedisStore, RedisReply } from "rate-limit-redis";
import { redisClient } from "../config/redis";
import { env } from "../config/env";

const options = {
  windowMs: 10 * 60 * 1000, // 15 mins
  max: 100, // limit per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later",
    error: {
      code: "RateLimitExceeded",
    },
  },
};

export const defaultLimiter = rateLimit({
  store: new RedisStore({
    prefix: "api-limiter:",
    sendCommand: (command: string, ...args: (string | number)[]) => {
      return redisClient.call(command, ...args) as Promise<any>;
    },
  }),
  ...options,
});

export const authLimiter = rateLimit({
  store: new RedisStore({
    prefix: "api-auth-limiter:",
    sendCommand: (command: string, ...args: (string | number)[]) => {
      return redisClient.call(command, ...args) as Promise<any>;
    },
  }),
  ...options,
  windowMs: 10 * 60 * 1000,
  max: 100, // login brute-force protection
});

export const apiLimiter = (req: any, res: any, next: any)=>{
  if (req.path.startsWith("/auth")) {
    return authLimiter(req, res, next);
  }else{
    return defaultLimiter(req, res, next);
  }
  
}
