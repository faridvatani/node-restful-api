import { User, IUser } from "../models/user.model";

export const getUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};

export const getUserBySessionToken = async (
  sessionToken: string,
): Promise<IUser | null> => {
  return await User.findOne({ "authentication.sessionToken": sessionToken });
};

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  const user = new User(userData);
  return await user.save();
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

export const updateUser = async (id: string, values: Record<string, any>) => {
  return await User.findByIdAndUpdate(id, values);
};

export const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};
