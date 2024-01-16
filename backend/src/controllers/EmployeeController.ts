import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { EmployeeModel } from "../models/Employee";
import { BaseController } from "../abstracts/Controller";

const prisma = new PrismaClient();

export class EmployeeController extends BaseController {
  async index(req: Request, res: Response): Promise<void> {
    const employees = await prisma.employee.findMany();
    res.json(employees.map((employee) => new EmployeeModel(employee)));
  }

  async show(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id) {
      res.status(400).send("Missing employee id");
      return;
    }
    const employee = await prisma.employee.findUnique({
      where: { id: Number(id) },
    });
    if (employee) {
      res.json(new EmployeeModel(employee));
    } else {
      res.status(404).send("Employee not found");
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const newEmployeeData = req.body;
    const newEmployee = new EmployeeModel(newEmployeeData);
    if (!newEmployee.validate()) {
      res.status(400).send("Invalid employee data");
      return;
    }
    const createdEmployee = await prisma.employee.create({
      data: newEmployeeData,
    });
    res.status(201).json(new EmployeeModel(createdEmployee));
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updatedEmployeeData = req.body;
    const updatedEmployee = new EmployeeModel(updatedEmployeeData);
    if (!updatedEmployee.validate()) {
      res.status(400).send("Invalid employee data");
      return;
    }
    try {
      const updatedEmployeeInDb = await prisma.employee.update({
        where: { id: Number(id) },
        data: updatedEmployeeData,
      });
      res.json(new EmployeeModel(updatedEmployeeInDb));
    } catch (error) {
      res.status(404).send("Employee not found");
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const deletedEmployee = await prisma.employee.delete({
        where: { id: Number(id) },
      });
      res.json(new EmployeeModel(deletedEmployee));
    } catch (error) {
      res.status(404).send("Employee not found");
    }
  }
}
