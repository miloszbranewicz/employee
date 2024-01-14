import express, { Express } from "express";
import dotenv from "dotenv";
import bodyparser from "body-parser";
import { passportLocal as passport } from "./config/passport";
import { authRouter } from "./routes/auth/routes";

dotenv.config();
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(bodyparser.json());
app.use(passport.initialize());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Routes
app.use(authRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
