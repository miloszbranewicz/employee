import { Response } from "express";
import { db } from "../../config/db";
import { RequestWithProject } from "../../types";

export const createOne = async (req: RequestWithProject, res: Response) => {
  try {
    const { project } = req.body;

    if (!project || !project.name) {
      res.status(400).json({ error: "Name required" });
    }

    const newProject = await db.project.create({
      data: {
        ...project,
      },
    });

    res.status(201).json({ project: newProject });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
