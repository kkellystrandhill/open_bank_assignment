import express from "express";
import locationMiddleware from "../middleware/locationMiddleware.js";
import getBranchesController from "../controllers/getBranchesController.js";

const router = express.Router();

router.get("/", locationMiddleware, async (req, res, next) => {
  getBranchesController(req, res, next);
});
export default router;
