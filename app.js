import express from "express";
import bodyParser from "body-parser";
import assignmentRouter from "./app/assignments.js";
import accountRouter from "./app/account.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(assignmentRouter);
app.use(accountRouter);

app.get("/", (req, res) => {
  return res.send("Hello Teacher!!");
});

app.listen(port, () => {
  console.log(`Server is running at the port ${port}`);
});
