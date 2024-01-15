import { Request, Response } from "express";
import { db } from "../../config/db";
/**
 * @swagger
 * /employees/{id}/time-records:
 *   get:
 *     summary: Get all time records for an employee
 *     description: Retrieves all time records for a specific employee based on their ID.
 *     tags:
 *       - Time Records
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the employee whose time records are to be retrieved.
 *     responses:
 *       200:
 *         description: Time records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 timeRecords:
 *                   type: array
 *                   items:
 *       400:
 *         description: Invalid id parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Invalid id parameter
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: Employee not found
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
export const getAllTimeRecords = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate id parameter
    if (!id) {
      return res.status(400).json({ error: "Invalid id parameter" });
    }

    // Convert id to number
    const employeeId = Number(id);

    // Check if employee exists
    const employee = await db.employee.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Fetch time records for the employee
    const timeRecords = await db.timeRecord.findMany({
      where: {
        employeeId,
      },
    });

    res.json({ timeRecords });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
