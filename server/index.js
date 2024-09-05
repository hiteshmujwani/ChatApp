import express, { json } from 'express'
import cors from 'cors'
import dotenv from "dotenv"

dotenv.config()
const app = express()
const port = process.env.PORT


// Middlewares 
app.use(cors({
    origin:"*",
    methods:["POST","GET","PUT","PATCH","DELETE"],
    credentials:true,
}))
app.use(express.json())

// Routes
app.get('/',async(req,res)=>{
    res.status(200).send("Yaha kya dekhne aaya hai bhai")
})

const server = app.listen(port,()=>{console.log(`SERVER RUNNING ON ${port}`)})