import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { ProductList } from "./data";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const MONGODB_URI =process.env.MONGODB_URI || "mongodb://localhost/tsAmazonMernDb";

mongoose.set("strictQuery", true);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("error conecting mongodb", error);
  });

const app = express();
const port = 4000;

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.get("/api/products", (req: Request, res: Response) => {
  res.json(ProductList);
});

app.get("/api/products/:slug", (req: Request, res: Response) => {
  res.json(ProductList.find((item) => item.slug === req.params.slug));
});

app.listen(port, () => {
  console.log(`server running at localhost:${port}`);
});
