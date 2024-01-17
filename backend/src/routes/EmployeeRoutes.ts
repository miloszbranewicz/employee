import { Router } from "express";
import { EmployeeController } from "../controllers/EmployeeController";
import { db } from "../config/db";
export const router = Router();
const employeeController = new EmployeeController(db);

router.get("/employees", employeeController.index);
router.post("/employees", employeeController.create);
router.get("/employees/:id", employeeController.show);
router.put("/employees/:id", employeeController.update);
router.delete("/employees/:id", employeeController.delete);
