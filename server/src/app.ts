import dotenv from "dotenv"

import express from "express"

import cors from "cors"
import helmet from "helmet"

import  morgan from "morgan"
import mongoose from "mongoose"


dotenv.config()



const app = express()


mongoose.connect(process.env.MONGODB_URI!)
.then(()=> console.log("Connected to MongoDB"))
.catch((err)=> console.error(err))

app.use(cors())

app.use(helmet())

app.use(morgan("dev"))

app.use(express.json())


const PORT = 8080


app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})
