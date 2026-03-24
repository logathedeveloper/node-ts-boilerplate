import { Request, Response } from "express";
import * as service from "./todo.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { successResponse } from "../../utils/response";

export const getTodos = asyncHandler (async (req: any, res: Response) => {
  const todos = await service.getTodos(req);
   
  successResponse({
    res,
    message: "success",
    data: todos,
  });
});

export const createTodo = async (req: any, res: Response) => {
  const todo = await service.createTodo({
    ...req.body,
    userId: req.user.id
  });
  successResponse({
    res,
    message: "success",
    data: todo,
  }); 
};