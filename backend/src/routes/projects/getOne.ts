/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     description: Retrieves a project by its unique ID.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the project to retrieve.
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *       400:
 *         description: Project ID required
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
 *         description: Internal server error occurred during retrieval
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
