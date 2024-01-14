import { Router } from "express";
import { passportLocal } from "../../config/passport";
import { db } from "../../config/db";
import { getOne } from "./getOne";
import { getAll } from "./getAll";
import { create as createOne } from "./create";
import { update as updateOne } from "./update";
import { deleteOne } from "./delete";

export const employeeRouter = Router();

// Routes for Employee
employeeRouter.get(
  "/employee/",
  passportLocal.authenticate("jwt", { session: false }),
  getAll
);

employeeRouter.get(
  "/employee/:id",
  passportLocal.authenticate("jwt", { session: false }),
  getOne
);

employeeRouter.post(
  "/employee/",
  passportLocal.authenticate("jwt", { session: false }),
  createOne
);

employeeRouter.put(
  "/employee/:id",
  passportLocal.authenticate("jwt", { session: false }),
  updateOne
);

employeeRouter.delete(
  "/employee/:id",
  passportLocal.authenticate("jwt", { session: false }),
  deleteOne
);
