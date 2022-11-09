import mongoose, { Model } from "mongoose";
const { Schema } = mongoose;

export interface IUserModel {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePic: string;
  bankAccount?: string;
}

const userSchema = new Schema<IUserModel>(
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

export const UserModel: Model<IUserModel> =
  mongoose.models.User || mongoose.model("User", userSchema);
