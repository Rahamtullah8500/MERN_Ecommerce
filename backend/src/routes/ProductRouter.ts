import express from "express";
import { ProductModel } from "../models/ProductModel";
import expressAsyncHandler from "express-async-handler";
import asyncHandler from "express-async-handler";

export const productRouter = express.Router();
// /api/prodcuts
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await ProductModel.find();
    res.json(products);
  })
);

// /api/slug/tshirt
productRouter.get(
  "/slug/:slug",
  expressAsyncHandler(async (req, res) => {
    const product = await ProductModel.findOne({ slug: req.params.slug });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  })
);

productRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await ProductModel.find().distinct("category");
    res.json(categories);
  })
);
