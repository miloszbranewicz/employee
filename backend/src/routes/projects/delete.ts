import { Request, Response } from "express";
import { db } from "../../config/db";

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const projectId = Number(req.params.id);

    if (!projectId) {
      return res.status(400).json({ error: "Project ID required" });
    }

    // Find the specific project
    const project = await db.project.findUnique({
      where: { id: projectId },
    });

    // If the project doesn't exist, return an error
    if (!project) {
      return res.status(404).json({ error: "project not found" });
    }

    // Delete the project in the database
    const deletedProject = await db.project.delete({
      where: { id: projectId },
    });

    // Return the deleted project
    res.status(200).json(deletedProject);
  } catch (error) {
    console.error("Error while deleting project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
