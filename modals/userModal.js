import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    phone: String,
  },
  { timestamps: true }
);

export const User = mongoose.model("user", userSchema);
