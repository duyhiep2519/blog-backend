import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import env from "dotenv";
import mongoose from "mongoose";
import articleRouter from "./src/route/article.js";
import userRouter from "./src/route/user.js";
import adminRouter from "./src/route/admin.js";

env.config();

//connect db

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err.message));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

//router
app.use("/article", articleRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
