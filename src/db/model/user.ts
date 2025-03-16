import { UserModel } from "@/type";
import { GetDB } from "../config";
import { comparePassword, hashPassword } from "../helpers/bcrypt";
import { signToken } from "../helpers/jwt";

const COLLECTION_NAME = "users";

type inputCreateUser = Omit<UserModel, "_id" | "createdAt" | "updatedAt">;

export async function CreateUser(user: inputCreateUser) {
  const db = await GetDB();

  const checkUser = await db.collection(COLLECTION_NAME).findOne({
    email: user.email,
  });

  if (checkUser) {
    throw new Error("Email already exists");
  }

  const modifiedUser = {
    ...user,
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "user",
    password: hashPassword(user.password),
  };

  const creatingUser = await db
    .collection(COLLECTION_NAME)
    .insertOne(modifiedUser);


  return creatingUser;
}

type inputLoginUser = Pick<UserModel, "email" | "password">;

export async function LoginUser(user: inputLoginUser) {
  const db = await GetDB();

  const checkUser = (await db.collection(COLLECTION_NAME).findOne({
    email: user.email,
  })) as UserModel;

  if (!checkUser) {
    throw new Error("Invalid email or password");
  }

  const checkPassword = comparePassword(user.password, checkUser.password);

  if (!checkPassword) {
    throw new Error("Invalid email or password");
  }

  const access_token = signToken({
    _id: checkUser._id,
    email: checkUser.email,
  });

  return access_token;
}
