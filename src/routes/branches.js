import express from "express";
import locationMiddleware from "../middleware/locationMiddleware.js";
import getBranches from "../functions/getBranches.js";

const router = express.Router();

router.get("/", locationMiddleware, async (req, res) => {
  const foundBranches = await getBranches({ req });
  return res.send(foundBranches);
});
export default router;
