import { Router } from "express";
import { login } from "./login";


export const authRouter = Router();

authRouter.post("/auth/login", login);
