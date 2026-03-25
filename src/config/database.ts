import mongoose from "mongoose";
import { env } from "./env";

let isConnected : boolean = false; 

export const connectDB = async () => {

  if(isConnected){
    console.log("MongoDB Already connected");
    return true;
  }
  try {
     await mongoose.connect(env.MONGO_URI as string);
     isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
};