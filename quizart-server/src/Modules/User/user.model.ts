import mongoose, { Document, Schema } from "mongoose";

import { IAuthentication } from "@auth/auth.interfaces";

export interface IUser {
  username: string;
  email: string;
  created: Date;
  authentication: IAuthentication;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    created: { type: Date, require: false },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("User", UserSchema);
