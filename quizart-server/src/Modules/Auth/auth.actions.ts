import { getRandom, isValidHash } from "@libs/auth";
import { GetSafeUserProps, GetUserByEmail } from "@user/user.actions";
import { Jwt } from "hono/utils/jwt";
import { IDto } from "@interfaces/IDto";
import { Document } from "mongoose";
import { IUserModel } from "@user/user.model";

export const Login = async (email: string, password: string): Promise<IDto> => {
  const user = await GetUserByEmail(email).select(
    "+authentication.password +authentication.salt"
  );

  if (!user) return { data: { message: "Authentication failed" }, status: 404 };

  if (!isValidHash(user.authentication, password))
    return { data: { message: "Authentication failed" }, status: 403 };

  const jwtoken = await getJwtAuth(user as IUserModel);

  return {
    data: { jwtoken, ...GetSafeUserProps(user.toObject()) },
    status: 0,
  };
};

export const getJwtAuth = async (user: IUserModel) => {
  const secretJWT = getRandom();
  user.authentication.sessionToken = secretJWT;
  user.save();

  return await Jwt.sign({ id: user._id }, secretJWT);
};
