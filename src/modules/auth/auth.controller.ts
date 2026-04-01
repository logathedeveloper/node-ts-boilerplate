import { Request, Response } from "express";
import * as service from "./auth.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { successResponse } from "../../utils/response";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = await service.register(req.body);
  
  successResponse({
    res,
    message: "success",
    data,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
 
  const data = await service.login(req.body);
 
  successResponse({
    res,
    message: "success",
    data,
  });
});

export const refresh = async (req: Request, res: Response) => {
  const token = req.body.refreshToken;
  const access = await service.refresh(token); 
  successResponse({
    res,
    message: "success",
    data: access,
  });
};

export const profile = async (req: any, res: any) => {
  const user = req.user;
  const data = await service.profile(user); 
  successResponse({
    res,
    message: "success",
    data : {...data}
  });
};