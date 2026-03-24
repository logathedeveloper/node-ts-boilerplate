import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title:{
      type : String,
      required : true
    },
    description: String,
    completed: {
      type: Boolean,
      default: false
    },
    user: {
      required : true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

todoSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("Todo", todoSchema);