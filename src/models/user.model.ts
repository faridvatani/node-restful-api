import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  authentication: {
    password: string;
    salt: string;
    sessionToken: string | null;
  };
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: false, default: null, nullable: true },
  lastName: { type: String, required: false, default: null, nullable: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const User = mongoose.model<IUser>("User", UserSchema);
