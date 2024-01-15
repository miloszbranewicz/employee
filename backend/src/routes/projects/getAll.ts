import { Request, Response } from "express";
import { db } from "../../config/db";

export const getAll = async (req: Request, res: Response) => {
  try {
    // Handle GET request for all projects
    const projects = await db.project.findMany();

    res.status(200).json({ projects });
  } catch (error) {
    console.error("Error while retrieving employees:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
