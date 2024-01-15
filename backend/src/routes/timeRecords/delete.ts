/**
 * @swagger
 * /time-records/{id}:
 *   delete:
 *     summary: Delete a time record by ID
 *     description: Delete a time record by its unique identifier.
 *     tags:
 *       - Time Records
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the time record to delete.
 *     responses:
 *       200:
 *         description: Time record deleted successfully.
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
 *         description: Internal server error occurred during deletion.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
import { Request, Response } from "express";
import { db } from "../../config/db";

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Validate input
    if (!id) {
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

    // Delete time record
    await db.timeRecord.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({ timeRecord: existingTimeRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
