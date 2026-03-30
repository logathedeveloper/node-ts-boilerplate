import { Request, Response } from "express";
import * as service from "./todo.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { successResponse } from "../../utils/response";

export const getTodos = asyncHandler(async (req: any, res: Response) => {
  const todos = await service.getTodos(req);

  successResponse({
    res,
    message: "success",
    ...todos,
  });
});

export const createTodo = asyncHandler(async (req: any, res: Response) => {
  const todo = await service.createTodo(req.body);
  successResponse({
    res,
    message: "success",
    data: todo,
  });
});

export const updateTodo = asyncHandler(async (req: any, res: Response) => {
  const todo = await service.updateTodo(req.params.id, req.body);
  successResponse({
    res,
    message: "success",
    data: todo,
  });
});

export const deleteTodo = asyncHandler(async (req: any, res: Response) => {
  const todo = await service.deleteTodo(req.params.id);
  successResponse({
    res,
    message: "success",
    data: todo,
  });
});
