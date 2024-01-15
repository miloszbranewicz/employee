/**
 * @swagger
 * /reports:
 *   get:
 *     summary: Get project reports
 *     description: Retrieves project reports, including total hours worked and record count for each project.
 *     tags:
 *       - Reports
 *     responses:
 *       200:
 *         description: Project reports retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   project:
 *                     type: object
 *                   totalHoursWorked:
 *                     type: number
 *                     description: Total hours worked for the project.
 *                   recordsCount:
 *                     type: number
 *                     description: Number of time records for the project.
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
    // Retrieve time record aggregation
    const timeRecordAggregation = await db.timeRecord.groupBy({
      by: ["projectId"],
      _sum: {
        hoursWorked: true,
      },
      _count: {
        id: true,
      },
    });

    // Retrieve project details
    const projectIds = timeRecordAggregation.map((record) => record.projectId);
    const projects = await db.project.findMany({
      where: {
        id: { in: projectIds },
      },
    });

    // Map projects to corresponding time record aggregations
    const report = timeRecordAggregation.map((record) => {
      const project = projects.find((p) => p.id === record.projectId);
      if (!project) {
        throw new Error(`Project not found for projectId: ${record.projectId}`);
      }
      return {
        project,
        totalHoursWorked: record._sum.hoursWorked,
        recordsCount: record._count.id,
      };
    });

    res.status(200).json(report);
  } catch (error) {
    console.error("Error while retrieving reports:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
