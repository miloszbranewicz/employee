/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Update an employee by ID
 *     description: Updates an employee's information by their unique ID.
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the employee to update.
 *       - in: body
 *         name: employee
 *         required: true
 *         description: The updated employee data.
 *         schema:
 *           type: object
 *           properties:
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the updated employee.
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
    const employeeId = Number(req.params.id);

    // Find the specific employee
    const employee = await db.employee.findUnique({
      where: { id: employeeId },
    });

    // If the employee doesn't exist, return an error
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Update the employee in the database
    const updatedEmployee = await db.employee.update({
      where: { id: employeeId },
      data: req.body,
    });

    // Return the updated employee
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error while updating employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
