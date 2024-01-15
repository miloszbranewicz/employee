/**
 * @swagger
 * /time-records/{id}:
 *   put:
 *     summary: Update a time record by ID
 *     description: Update a time record by its unique identifier.
 *     tags:
 *       - Time Records
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the time record to update.
 *       - in: body
 *         name: timeRecord
 *         description: The updated time record object.
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/TimeRecord'
 *     responses:
 *       200:
 *         description: Time record updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TimeRecord'
 *       400:
 *         description: Invalid input or missing ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Time record not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error occurred during update.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

import { Request, Response } from "express";
import { db } from "../../config/db";

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { timeRecord } = req.body;

  try {
    // Validate input
    if (!id || !timeRecord) {
      return res.status(400).json({ error: "Invalid input" });
    }

    // Check if time record exists
    const existingTimeRecord = await db.timeRecord.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingTimeRecord) {
      return res.status(404).json({ error: "Time record not found" });
    }

    // Update time record
    const updatedTimeRecord = await db.timeRecord.update({
      where: {
        id: Number(id),
      },
      data: {
        ...timeRecord,
      },
    });

    res.json({ timeRecord: updatedTimeRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
