import { Request, Response } from "express";
import { db } from "../../config/db";

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
 *     description: Retrieves a list of all employees with their information.
 *     tags:
 *       - Employees
 *     responses:
 *       200:
 *         description: List of employees retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employees:
 *                   type: array
 *                   description: List of employees.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the employee.
 *                       email:
 *                         type: string
 *                         description: The email of the employee.
 *                       firstName:
 *                         type: string
 *                         description: The first name of the employee.
 *                       lastName:
 *                         type: string
 *                         description: The last name of the employee.
 *                       permissions:
 *                         type: array
 *                         description: List of permissions for the employee.
 *                         items:
 *                           type: string
 *                       phoneNumber:
 *                         type: string
 *                         description: The phone number of the employee.
 *                       timeRecords:
 *                         type: array
 *                         description: List of time records for the employee.
 *                         items:
 *                           type: object
 *                       role:
 *                         type: string
 *             example:
 *               employees:
 *                 - id: 1
 *                   email: john@example.com
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
export const getAll = async (req: Request, res: Response) => {
    try {
      // Handle GET request for all employees
      const employees = await db.employee.findMany({
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
  
      res.status(200).json({ employees });
    } catch (error) {
      console.error("Error while retrieving employees:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
