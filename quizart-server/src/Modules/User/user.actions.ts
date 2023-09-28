import { getHash, getRandom } from "@libs/auth";
import userModel, { IUser, IUserModel } from "./user.model";
import { IDto } from "@interfaces/IDto";
import { getJwtAuth } from "@auth/auth.actions";

export const GetAllUsers = () => userModel.find();
export const GetUserById = (id: string) => userModel.findById(id);
export const GetUserByEmail = (email: string) => userModel.findOne({ email });
export const GetUserByToken = (token: string) =>
  userModel.findOne({ "authentication.sessionToken": token });

export const DeleteUserById = (id: string) => userModel.findByIdAndDelete(id);
export const UpdateUserById = (id: string, values: Record<string, any>) =>
  userModel.findByIdAndUpdate(id, values);

export const GetSafeUserProps = (user: IUser) => {
  const { authentication: _, ...userProps } = user;
  return userProps as IUser;
};

export const CreateUser = async (
  values: Record<string, any>
): Promise<IDto> => {
  try {
    const exist = await GetUserByEmail(values.email);

    if (exist)
      return { data: { message: "User email already exist" }, status: 400 };

    const user = new userModel(values);

    const salt = getRandom();
    const hash = getHash(salt, values.password);

    user.created = new Date();
    user.authentication.password = hash;
    user.authentication.salt = salt;

    const result = await user.save();

    console.log("result", result);
    const { authentication: _, ...newUser } = result.toObject();

    const jwtoken = await getJwtAuth(user as IUserModel);

    return { data: { jwtoken, ...newUser }, status: 200 };
  } catch (err) {
    if (err instanceof Error) {
      return {
        data: { message: err.message },
        status: 500,
        error: [err],
      };
    }

    return {
      data: { message: "there was an error" },
      status: 500,
      error: [],
    };
  }
};
