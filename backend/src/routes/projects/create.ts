/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     description: Creates a new project with the provided details.
 *     tags:
 *       - Projects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                 required:
 *                   - name
 *             example:
 *               project:
 *                 name: My New Project
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 project:
 *                   type: object
 *       400:
 *         description: Name required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Name required
 *       500:
 *         description: Internal server error occurred during creation
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

export const createOne = async (req: Request, res: Response) => {
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
