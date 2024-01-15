import { Request, Response } from "express";
import { db } from "../../config/db";

export const update = async (req: Request, res: Response) => {
  try {
    const projectId = Number(req.params.id);



    // Find the specific project
    const project = await db.project.findUnique({
      where: { id: projectId },
    });

    // If the project doesn't exist, return an error
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Update the project in the database
    const updatedProject = await db.project.update({
      where: { id: projectId },
      data: req.body,
    });

    // Return the updated project
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error while updating project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
