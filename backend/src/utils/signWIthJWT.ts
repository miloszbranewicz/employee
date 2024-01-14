import jwt from "jsonwebtoken";
import { TokenPayload } from "../types";

function signWithJWT(payload: TokenPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "15min",
  });
}

export default signWithJWT;


