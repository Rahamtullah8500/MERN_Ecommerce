import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { ProductList } from '../data'
import { ProductModel } from '../models/ProductModel'

export const seedRouter = express.Router()

seedRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({})
    const createdProducts = await ProductModel.insertMany(ProductList)
    res.json({ createdProducts })
  })
)