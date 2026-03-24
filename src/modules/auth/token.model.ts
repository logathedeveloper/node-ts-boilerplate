import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  token: String
});

export default mongoose.model("Token", tokenSchema);