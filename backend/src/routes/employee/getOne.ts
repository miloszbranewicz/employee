/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     description: Retrieves an employee's information by their unique ID.
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the employee to retrieve.
 *     responses:
 *       200:
 *         description: Employee retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the employee.
 *                 email:
 *                   type: string
 *                   description: The email of the employee.
 *                 firstName:
 *                   type: string
 *                   description: The first name of the employee.
 *                 lastName:
 *                   type: string
 *                   description: The last name of the employee.
 *                 permissions:
 *                   type: array
 *                   description: List of permissions for the employee.
 *                   items:
 *                     type: string
 *                 phoneNumber:
 *                   type: string
 *                   description: The phone number of the employee.
 *                 timeRecords:
 *                   type: array
 *                   description: List of time records for the employee.
 *                   items:
 *                     type: object
 *                 role:
 *                   type: string
 *                   description: The role of the employee.
 *             example:
 *               id: 1
 *               email: john@example.com
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
import { Request, Response } from "express";
import { db } from "../../config/db";

export const getOne = async (req: Request, res: Response) => {
  try {
    const employeeId = Number(req.params.id);

    // Find the specific employee
    const employee = await db.employee.findUnique({
      where: { id: employeeId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        permissions: true,
        phoneNumber: true,
        timeRecords: true,
        role: true,
      },
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Return the employee information
    res.status(200).json(employee);
  } catch (error) {
    console.error("Error while retrieving employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
