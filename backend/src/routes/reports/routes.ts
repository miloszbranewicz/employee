import { Router } from "express";
import { getOne } from "./getOne";
import { getAll } from "./getAll";

export const reportsRouter = Router();

// Generate reports
reportsRouter.get("/reports/", getAll);

// Report details
reportsRouter.get("/reports/:id", getOne);
