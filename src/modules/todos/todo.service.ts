import { getPaginationParams, paginate } from "../../utils/pagination";
import Todo from "./todo.model";

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
  return Todo.create(data);
};

export const updateTodo = async (id: string, data: any) => {
  return Todo.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTodo = async (id: string) => {
  return Todo.findByIdAndDelete(id);
};
