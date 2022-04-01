import express from "express";
import axios from "axios";
const app = express();

app.get("/", async (req, res) => {
  const response = await axios(
    "https://api.lloydsbank.com/open-banking/v2.2/branches"
  );
  return res.send(await response.data);
});

export default app;
