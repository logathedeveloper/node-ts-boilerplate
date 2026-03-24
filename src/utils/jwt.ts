import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ id: userId }, env.JWT_SECRET as string, {
    expiresIn: "30m"
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    { id: userId },
    env.JWT_REFRESH_SECRET as string,
    { expiresIn: "7d" }
  );
};