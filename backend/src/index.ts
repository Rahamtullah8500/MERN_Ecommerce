import express, {Request,Response} from 'express'
import { ProductList } from './data'
import cors form 'cors'

const app = express()
const port = 4000

app.use(
    cors({
        credentials:true,
        origin:['http://localhost:5173']
    })
)

app.get('/api/products',(req:Request,res:Response)=>{
    res.json(ProductList)
})

app.listen(port,()=>{
    console.log(`server running at localhost:${port}`)
})