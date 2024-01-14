import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "./config/constants";

type Role = (typeof Role)[keyof typeof Role];

interface TokenPayload {
  sub: number
  email: string;
  role: Role;
}

interface RequestWithUser extends Request {
  user: JwtPayload & TokenPayload;
}

