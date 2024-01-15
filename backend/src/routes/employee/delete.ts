import { Request, Response } from "express";
import { db } from "../../config/db";

/**
 * @swagger
 * /employee/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     description: Deletes an employee by their unique ID.
 *     tags:
 *       - Employee
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the employee to delete.
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
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
 *         description: Internal server error occurred during deletion
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
export const deleteOne = async (req: Request, res: Response) => {
    try {
      const employeeId = Number(req.params.id);

      if(!employeeId) {
        return res.status(400).json({ error: "Employee ID not provided" });
      }
  
      // Find the specific employee
      const employee = await db.employee.findUnique({
        where: { id: employeeId },
      });
  
      // If the employee doesn't exist, return an error
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }
  
      // Delete the employee in the database
      const deletedEmployee = await db.employee.delete({
        where: { id: employeeId },
      });
  
      // Return the deleted employee
      res.status(200).json(deletedEmployee);
    } catch (error) {
      console.error("Error while deleting employee:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  