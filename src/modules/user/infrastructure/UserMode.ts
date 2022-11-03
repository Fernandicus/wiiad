import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: {
      type: String,
      required: true,
      min: 1,
    },
    email: {
      type: String,
      required: true,
      min: 1,
    },
    profilePic: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      min: 1,
    },
    bankAccount: { type: String },
  },
  { _id: false }
);

export interface UserModelProps {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePic: string;
  bankAccount?: string;
}

export const UserModel =
  mongoose.models.User || mongoose.model("User", userSchema);
