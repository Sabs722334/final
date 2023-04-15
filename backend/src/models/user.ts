/** @format */

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const User: any = mongoose.model("user", UserSchema);
export default User;
