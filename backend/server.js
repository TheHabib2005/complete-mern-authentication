import express from "express";
import userRouter from "./src/user/userRoute.js";
import cors from "cors";
import connectToDB from "./src/db/config/conncetTodb.js";
import dotenv from "dotenv"
dotenv.config()
const app = express();
const port = process.env.PORT || 8000;
app.use(cors())
app.use(express.json());
connectToDB()
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.cookie("token","qadadasdasdas")
  res.send("<h1>Hello World</h1>");
});


app.use("/api/users", userRouter);

