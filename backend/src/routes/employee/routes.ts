import { Router } from "express";
import { passportLocal } from "../../config/passport";
import { db } from "../../config/db";
import { getOne } from "./getOne";
import { getAll } from "./getAll";

import { update as updateOne } from "./update";
import { deleteOne } from "./delete";
import { createOne } from "./create";
import { getAllTimeRecords } from "./getAllTimeRecords";

export const employeeRouter = Router();

// Routes for Employee
employeeRouter.get("/employee", getAll);

employeeRouter.get("/employee/:id", getOne);

employeeRouter.post("/employee/", createOne);

employeeRouter.put("/employee/:id", updateOne);

employeeRouter.delete("/employee/:id", deleteOne);

// Get all time records for an employee
employeeRouter.get("/employee/:id/time-records", getAllTimeRecords);
