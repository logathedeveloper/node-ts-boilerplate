import bcrypt from "bcrypt";
import User from "../user/user.model";
import Token from "./token.model";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken} from "../../utils/jwt";
import { env } from "../../config/env";
import { AppError } from "../../utils/AppError";

export const register = async (data: any) => {

  const userExist = await User.findOne({ email: data.email });

  if (userExist) throw new AppError("Validation Error", 422, "ValidationError", {
    "email": "Email already Exist"
});

  const hashed = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashed
  });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await Token.create({
    userId: user.id,
    token: refreshToken
  });

  return { accessToken, refreshToken, user: { id: user.id, name: user.name, email: user.email } }; 
};

export const login = async (data : {email : string, password :string}) => {
  const { email, password } = data;
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new AppError("Invalid credentials", 400, "InvalidData");

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) throw new AppError("Invalid credentials", 400, "InvalidData");

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await Token.create({
    userId: user.id,
    token: refreshToken
  });

  return { accessToken, refreshToken, user: { id: user.id, name: user.name, email: user.email } };
};

export const refresh = async (token: string) => {
  const stored = await Token.findOne({ token });

  if (!stored) throw new AppError("Invalid refresh token", 400, "InvalidData");

  const payload: any = jwt.verify(
    token,
    env.JWT_REFRESH_SECRET as string
  );

  const accessToken = generateAccessToken(payload.id);

  return { accessToken };
};

export const profile = async (user : any) => {
  const data = await User.findById(user.id ).lean();

  if (!data) throw new AppError("Invalid Session", 400, "InvalidData");
 
  return data ;
};