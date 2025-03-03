import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectionDB from "./db/config.js";
import userRoute from "./routes/userRoutes.js";
import productRoute from "./routes/productRoutes.js";

const app = express();

dotenv.config({
  path: "./.env",
});
connectionDB();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("upload"));

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(`server listing port ${process.env.PORT}`);
});
