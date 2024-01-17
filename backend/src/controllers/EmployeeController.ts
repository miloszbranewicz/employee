import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { EmployeeModel } from "../models/Employee";
import { BaseController } from "../abstracts/Controller";
import { ErrorResponse } from "../responses/ErrorResponse";
import { SuccessResponse } from "../responses/SuccessResponse";

const prisma = new PrismaClient();

export class EmployeeController extends BaseController {
  async index(req: Request, res: Response): Promise<void> {
    const employees = await prisma.employee.findMany();
    new SuccessResponse(res).sendSuccess(
      employees.map((employee) => new EmployeeModel(employee).toJSON()),
      "Employees found",
      200
    );
  }

  async show(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      new ErrorResponse(res).sendError(
        "Missing employee id",
        "Bad request",
        400
      );
      return;
    }
    const employee = await prisma.employee.findUnique({
      where: { id: Number(id) },
    });
    if (employee) {
      new SuccessResponse(res).sendSuccess(
        new EmployeeModel(employee),
        "Employee found",
        200
      );
    } else {
      new ErrorResponse(res).sendError("Employee not found", "Not found", 404);
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const newEmployeeData = req.body;
    const newEmployee = new EmployeeModel(newEmployeeData);
    if (!newEmployee.validate()) {
      new ErrorResponse(res).sendError(
        "Invalid employee data",
        "Bad request",
        400
      );
      return;
    }
    const createdEmployee = await prisma.employee.create({
      data: newEmployeeData,
    });
    new SuccessResponse(res).sendSuccess(
      new EmployeeModel(createdEmployee),
      "Employee created",
      201
    );
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updatedEmployeeData = req.body;
    const updatedEmployee = new EmployeeModel(updatedEmployeeData);
    if (!updatedEmployee.validate()) {
      new ErrorResponse(res).sendError(
        "Invalid employee data",
        "Bad request",
        400
      );
      return;
    }
    try {
      const updatedEmployeeInDb = await prisma.employee.update({
        where: { id: Number(id) },
        data: updatedEmployeeData,
      });
      new SuccessResponse(res).sendSuccess(
        new EmployeeModel(updatedEmployeeInDb),
        "Employee updated",
        200
      );
    } catch (error) {
      new ErrorResponse(res).sendError("Employee not found", "Not found", 404);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const deletedEmployee = await prisma.employee.delete({
        where: { id: Number(id) },
      });
      new SuccessResponse(res).sendSuccess(
        new EmployeeModel(deletedEmployee),
        "Employee deleted",
        200
      );
    } catch (error) {
      new ErrorResponse(res).sendError("Employee not found", "Not found", 404);
    }
  }
}
