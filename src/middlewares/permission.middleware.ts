import jwt from "jsonwebtoken";
import { env } from '../config/env';

export const permissionMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];

  next();
    // if (!token) {
  // errorResponse({
  //   res,
  //   message: "Invalid token",
  //   code: "Unauthorized",
  //   statusCode: 401,
  // }); 
  // }

  // try {
  //   const decoded = jwt.verify(token, env.JWT_SECRET as string);
  //   req.user = decoded;
  //   next();
  // } catch {

  // errorResponse({
  //   res,
  //   message: "Invalid token",
  //   code: "Unauthorized",
  //   statusCode: 401,
  // });  
  // }
};