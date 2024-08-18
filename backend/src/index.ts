import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { ProductList } from "./data";
import cors from "cors";
import mongoose from "mongoose";
import { productRouter } from "./routes/ProductRouter";
import { userRouter } from "./routes/UserRouter";
import { seedRouter } from "./routes/SeedRouter";
import { orderRouter } from './routes/OrderRouter';
import { keyRouter } from './routes/KeyRouter';
import path from 'path'

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

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/seed', seedRouter)
app.use('/api/orders', orderRouter)
app.use('/api/keys', keyRouter)

app.get("/api/products", (req: Request, res: Response) => {
  res.json(ProductList);
});

app.get("/api/products/:slug", (req: Request, res: Response) => {
  res.json(ProductList.find((item) => item.slug === req.params.slug));
});


app.use(express.static(path.join(__dirname, '../../frontend/dist')))
app.get('*', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
)

const PORT: number = parseInt((process.env.PORT || '4000') as string, 10)

app.listen(port, () => {
  console.log(`server running at localhost:${port}`);
});
