import express from "express";
import branchesRoutes from "./routes/branches.js";

const app = express();

app.use("/", branchesRoutes);

export default app;
