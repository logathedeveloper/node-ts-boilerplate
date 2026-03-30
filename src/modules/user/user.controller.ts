import { Request, Response } from "express";
import * as service from "./user.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { errorResponse, successResponse } from "../../utils/response";
import { sendMail } from "../../config/mail";

export const getUsers = asyncHandler(async (req: any, res: Response) => {
  const data = await service.getUsers(req);

  successResponse({
    res,
    message: "success",
    ...data,
  });
});

export const createUser = asyncHandler(async (req: any, res: Response) => {
  const data = await service.createUser(req.body);
 
  successResponse({
    res,
    message: "success",
    data,
  });
});

export const updateUser = asyncHandler(async (req: any, res: Response) => { 
  const data = await service.updateUser(req.params.id, req.body);

  successResponse({
    res,
    message: "success",
    data,
  });
});

export const updateUserProfileImage = asyncHandler(
  async (req: any, res: Response) => {
    if (!req.file) {
       errorResponse({
        res,
        message: "Validation Error",
        code: "ValidationError",
        statusCode: 422,
        details: "Profile image is required",
      });
    }

    const data = await service.updateUserProfileImage(req.params.id, req.file);

    successResponse({
      res,
      message: "success",
      data,
    });
  }
);
