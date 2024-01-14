import { Router } from "express";
import { login } from "./login";
import { register } from "./register";
import { passportLocal } from "../../config/passport";

export const authRouter = Router();

authRouter.post("/auth/login", login);
authRouter.post(
  "/auth/register",
  passportLocal.authenticate("jwt", { session: false }),
  register
);
