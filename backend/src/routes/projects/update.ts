/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update a project by ID
 *     description: Updates a project by its unique ID.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the project to update.
 *       - in: body
 *         name: project
 *         description: The project data to update.
 *         required: true
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *       400:
 *         description: Project ID required or invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Project ID required
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Project not found
 *       500:
 *         description: Internal server error occurred during update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Internal server error
 */
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
