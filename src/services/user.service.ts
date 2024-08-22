import { User, IUser } from "../models/user.model";

export const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email }).select(
    "+authentication.salt +authentication.password",
  );
};

export const getUserByUsername = async (username: string) => {
  return await User.findOne({ username }).select(
    "+authentication.salt +authentication.password",
  );
};

export const getUserBySessionToken = async (
  sessionToken: string,
): Promise<IUser | null> => {
  return await User.findOne({
    "authentication.sessionToken": sessionToken,
  }).select("+authentication.sessionToken");
};

export const createUser = async (
  userData: Record<string, any>,
): Promise<IUser> => {
  const user = new User(userData);
  return await user.save();
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id).select(
    "+authentication.salt +authentication.password",
  );
};

export const updateUser = async (id: string, values: Record<string, any>) => {
  return await User.findByIdAndUpdate(id, values).select(
    "+authentication.salt +authentication.password",
  );
};

export const deleteUser = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id).select(
    "+authentication.salt +authentication.password",
  );
};
