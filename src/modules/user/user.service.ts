import { UserCreatedEvent } from "../../events/user.event";
import { AppError } from "../../utils/AppError";
import { getPaginationParams, paginate } from "../../utils/pagination";
import User from "./user.model";
import fs from "fs";
import bcrypt from "bcrypt";

export const getUsers = async ({ query }: { query: any }) => {
  const pagination = getPaginationParams(query);
  const filter: any = {};

  if (query.filter) {
    for (const key in query.filter) {
      switch (key) {
        case "email":
          filter[key] = query.filter[key];
          continue;
        default:
          filter[key] = { $regex: query.filter[key], $options: "i" };
          continue;
      }
    }
  }
  return paginate({
    model: User,
    query: filter,
    options: {
      ...pagination,
      populate: [],
    },
  });
};

export const createUser = async (data: any) => {
  const userExist = await User.findOne({ email: data.email });

  if (userExist)
    throw new AppError("Validation Error", 422, "ValidationError", {
      email: "Email already exist",
    });

  const hashed = await bcrypt.hash(data.password, 10);

  const newUserData = await User.create({ ...data, password: hashed });

  const user = await User.findById(newUserData._id).select("-__v");

  UserCreatedEvent.emit(data);

  return user;
};

export const updateUser = async (id: string, data: any) => {
  const user = await User.findById(id);
  if (!user)
    throw new AppError("Validation Error", 422, "ValidationError", {
      id: "Invalid User Id",
    });

  const checkEmailExist = await User.findOne({
    email: data.email,
    _id: { $ne: id },
  });

  if (checkEmailExist)
    throw new AppError("Validation Error", 422, "ValidationError", {
      email: "This Email id already associated with another account",
    });
  let newData = data;
  if (data.password) {
    const hashed = await bcrypt.hash(data.password, 10);

    newData = { ...data, password: hashed };
  }

  return User.findByIdAndUpdate(id, newData, { new: true }).select("-__v");
};

export const updateUserProfileImage = async (id: string, data: any) => {
  const user = await User.findById(id);

  if (!user)
    throw new AppError("Validation Error", 422, "ValidationError", {
      email: "Invalid User Id",
    });

  if (user.profileImage) {
    const oldPath = "src" + user.profileImage;
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }
  }

  const imagePath = `/uploads/images/${data.filename}`;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { profileImage: imagePath },
    { new: true }
  ).select("-__v");

  return updatedUser;
};

export const deleteUser = async (id: string) => {
  return User.findByIdAndDelete(id);
};
