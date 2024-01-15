import { Router } from "express";
import { login } from "./login";
import { refreshToken } from "./token";
import { changePassword } from "./changePassword";

export const authRouter = Router();

authRouter.post("/auth/login", login);
authRouter.post("/auth/logout", login);

// @TODO: Add routes for:
authRouter.post("/auth/token", refreshToken);
authRouter.post("/auth/change-password", changePassword);
