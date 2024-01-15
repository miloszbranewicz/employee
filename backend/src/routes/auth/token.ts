import { Request, Response } from "express";


export const refreshToken = async (req: Request, res: Response) => {
  res.status(501).json({ error: "Not implemented" });
};
