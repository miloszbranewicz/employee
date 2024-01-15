import { Router } from "express";
import { passportLocal } from "../../config/passport";
import { db } from "../../config/db";
import { getOne } from "./getOne";
import { getAll } from "./getAll";

import { update as updateOne } from "./update";
import { deleteOne } from "./delete";
import { createOne } from "./create";

export const projectsRouter = Router();


projectsRouter.get(
  "/projects",
  getAll
);

projectsRouter.get(
  "/projects/:id",
  getOne
);

projectsRouter.post(
  "/projects/",
  createOne
);

projectsRouter.put(
  "/projects/:id",
  updateOne
);

projectsRouter.delete(
  "/projects/:id",
  deleteOne
);
