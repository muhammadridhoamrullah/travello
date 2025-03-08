import { UserModel } from "@/type";
import { GetDB } from "../config";
import { hashPassword } from "../helpers/bcrypt";

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

  console.log(creatingUser, "ini creatingUser di model user");

  return creatingUser;
}
