/**
 * @swagger
 * /time-records:
 *   post:
 *     summary: Create a new time record
 *     description: Create a new time record entry with employeeId, projectId, date, and hoursWorked.
 *     tags:
 *       - Time Records
 *     requestBody:
 *       description: Time record data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: integer
 *                 description: The ID of the employee.
 *               projectId:
 *                 type: integer
 *                 description: The ID of the project.
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the time record (YYYY-MM-DD).
 *               hoursWorked:
 *                 type: number
 *                 description: The number of hours worked.
 *             example:
 *               employeeId: 1
 *               projectId: 100
 *               date: 2022-01-15
 *               hoursWorked: 8
 *     responses:
 *       201:
 *         description: Time record created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeRecord'
 *       400:
 *         description: Data not complete or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error occurred during creation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
import { Request, Response } from "express";
import { db } from "../../config/db";

export const createOne = async (req: Request, res: Response) => {
  try {
    const { employeeId, projectId, date, hoursWorked } = req.body;

    if (!employeeId || !projectId || !date || !hoursWorked) {
      return res.status(400).json({ message: "Data not complete" });
    }

    const newTimeRecord = await db.timeRecord.create({
      data: {
        employeeId,
        projectId,
        date,
        hoursWorked,
      },
    });

    res.status(201).json(newTimeRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
