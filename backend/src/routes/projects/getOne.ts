import { Request, Response } from "express";
import { db } from "../../config/db";

export const getOne = async (req: Request, res: Response) => {
  try {
    const projectId = Number(req.params.id);

    if (!projectId) {
      return res.status(400).json({ error: "Project ID required" });
    }

    // Find the specific project
    const project = await db.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Return the project information
    res.status(200).json(project);
  } catch (error) {
    console.error("Error while retrieving project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
