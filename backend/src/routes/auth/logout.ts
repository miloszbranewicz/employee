import { Request, Response } from "express";


export const logout = async (req: Request, res: Response) => {
  res.status(501).json({ error: "Not implemented" });
};
