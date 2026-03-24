import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true, select: false },
    profileImage: { type: String },
  },
  { timestamps: true }
);

userSchema.index({ email: 1, name: 1, createdAt: -1 });

export default mongoose.model("User", userSchema);
