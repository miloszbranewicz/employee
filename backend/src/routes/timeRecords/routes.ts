import { Router } from "express";
import { update as updateOne } from "./update";
import { deleteOne } from "./delete";
import { createOne } from "./create";

export const timeRecordsRouter = Router();

// Save time record
timeRecordsRouter.post("/time-records/", createOne);

// Update time record
timeRecordsRouter.put("/time-records/:id", updateOne);

// Delete time record
timeRecordsRouter.delete("/time-records/:id", deleteOne);
