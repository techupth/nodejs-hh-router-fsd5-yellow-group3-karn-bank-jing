import express from "express";
import bodyParser from "body-parser";

import assignmentsRouter from "./apps/assignmentsRouter.js";
import accountsRouter from "./apps/accountsRouter.js";

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use("/assignments", assignmentsRouter);
app.use("/accounts", accountsRouter);

app.get("/", (req, res) => {
  return res.send("Hello Teacher!!");
});

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
