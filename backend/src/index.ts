import express, { Express } from "express";
import dotenv from "dotenv";
import bodyparser from "body-parser";
import { passportLocal as passport } from "./config/passport";
import { authRouter } from "./routes/auth/routes";
import { employeeRouter } from "./routes/employee/routes";
import { projectsRouter } from "./routes/projects/routes";
import { reportsRouter } from "./routes/reports/routes";
import { timeRecordsRouter } from "./routes/timeRecords/routes";

dotenv.config();
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const swaggerDocument = require("./config/swagger.json");
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(bodyparser.json());
app.use(passport.initialize());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Routes
app.use(authRouter);
app.use(employeeRouter);
app.use(projectsRouter);
app.use(reportsRouter);
app.use(timeRecordsRouter);
// app.use(passport.authenticate("jwt", { session: false }), employeeRouter);
// app.use(passport.authenticate("jwt", { session: false }), projectsRouter);
// app.use(passport.authenticate("jwt", { session: false }), reportsRouter);
// app.use(passport.authenticate("jwt", { session: false }), timeRecordsRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
