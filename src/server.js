import app from "./app.js";

const port = 3000;
console.log(".....");
app.listen(port, () =>
  console.log(`Test openBanking app listening on port ${port}!`)
);

export default app;
