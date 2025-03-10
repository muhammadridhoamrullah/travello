import jwt, { JwtPayload } from "jsonwebtoken";

const SECRETO = process.env.SECRET_KEY!;

export const signToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, SECRETO);
};
