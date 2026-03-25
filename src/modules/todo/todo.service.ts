import { getPaginationParams, paginate } from "../../utils/pagination";
import Todo from "./todo.model";
import User from "../user/user.model";
import { AppError } from "../../utils/AppError";

export const getTodos = async ({ query }: { query: any }) => {
  const pagination = getPaginationParams(query);
  const filter: any = {};

  if (query.filter) {
    for (const key in query.filter) {
      switch (key) {
        case "user":
        case "completed":
          filter[key] = query.filter[key];
          continue;
        default:
          filter[key] = { $regex: query.filter[key], $options: "i" };
          continue;
      }
    }
  }
  return paginate({
    model: Todo,
    query: filter,
    options: {
      ...pagination,
      populate: [{ path: "user", select: "name email" }],
    },
  });
};

export const createTodo = async (data: any) => {
  const userExist = await User.findById(data.userId);

  if (!userExist)
    throw new AppError("Validation Error", 422, "ValidationError", {
      userId: "Invalid User Id",
    });

  const todo = await Todo.create({ ...data, user: data.userId });

  return todo;
};

export const updateTodo = async (id: string, data: any) => {
  const todo = await Todo.findById(id);

  console.log("ssss", todo, id);
  if (!todo)
    throw new AppError("Validation Error", 422, "ValidationError", {
      id: "Invalid ToDo Id",
    });

  const userExist = await User.findById(data.userId);

  if (!userExist)
    throw new AppError("Validation Error", 422, "ValidationError", {
      userId: "Invalid Id",
    });

  const updateTodo = await Todo.findByIdAndUpdate(
    id,
    { ...data, user: data.userId },
    { new: true }
  );

  console.log("ssss", todo, updateTodo);
  return updateTodo;
};

export const deleteTodo = async (id: string) => {
  const todo = await Todo.findById(id);

  if (!todo)
    throw new AppError("Validation Error", 422, "ValidationError", {
      id: "Invalid Id or Id not exist",
    });
  await Todo.findByIdAndDelete(id);

  return true;
};
