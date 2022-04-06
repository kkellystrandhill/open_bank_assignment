import express from "express";
import branchesRoutes from "./routes/branches.js";
import getCustomErrorResponse from "./errorLogger/getCustomErrorResponse.js";

const app = express();

app.use("/", branchesRoutes);
app.use(getCustomErrorResponse);

export default app;
