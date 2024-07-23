import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { ProductList, sampleUsers } from '../data'
import { ProductModel } from '../models/ProductModel'
import { UserModel } from '../models/UserModel'

export const seedRouter = express.Router()

seedRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({})
    const createdProducts = await ProductModel.insertMany(ProductList)
   
    await UserModel.deleteMany({})
    const createdUsers = await UserModel.insertMany(sampleUsers)

    res.json({ createdProducts, createdUsers })
  })
)