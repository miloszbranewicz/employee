/**
 * @swagger
 * /reports/{id}:
 *   get:
 *     summary: Get report by ID
 *     description: Retrieve report details by its unique ID, including associated time records.
 *     tags:
 *       - Reports
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the report to retrieve.
 *     responses:
 *       200:
 *         description: Successful response with report details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/report'
 *       400:
 *         description: Invalid report identifier.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             example: Invalid report identifier.
 *       404:
 *         description: report not found.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *             example: report not found.
 *       500:
 *         description: Internal server error occurred during retrieval.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
import { Request, Response } from "express";
import { db } from "../../config/db";

export const getOne = async (req: Request, res: Response) => {
  const projectId = parseInt(req.params.id);

  if (!projectId) {
    return res.status(400).send("Invalid project identifier."); // Validation error
  }

  try {
    // Fetch project details
    const project = await db.project.findUnique({
      where: { id: projectId },
      include: {
        timeRecords: true, // Include all time records associated with the project
      },
    });

    if (!project) {
      return res.status(404).send("Project not found."); // Project not found error
    }

    // Additional processing can be added to format the report data

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error while fetching report details." }); // Server error
  }
};
