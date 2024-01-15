/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     description: Retrieves a list of all projects.
 *     tags:
 *       - Projects
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projects:
 *                   type: array
 *                   items:
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

export const getAll = async (req: Request, res: Response) => {
  try {
    // Handle GET request for all projects
    const projects = await db.project.findMany();

    res.status(200).json({ projects });
  } catch (error) {
    console.error("Error while retrieving projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
