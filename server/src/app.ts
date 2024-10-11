import dotenv from "dotenv"

import express from "express"

import cors from "cors"
import helmet from "helmet"

import  morgan from "morgan"
import mongoose from "mongoose"

import passport from "passport"
import session from "express-session"

import MongoStore from "connect-mongo"

import "./config/passport"

dotenv.config()



// Routes 

import authRoutes from "./routes/auth"





const app = express()


mongoose.connect(process.env.MONGODB_URI!)
.then(()=> console.log("Connected to MongoDB"))
.catch((err)=> console.error(err))

app.use(cors())

app.use(helmet())

app.use(morgan("dev"))

app.use(express.json())


app.use()
app.use(passport.initialize())
app.use(passport.session())
app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized:false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI!
    }),
    cookie: {
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 24*60 *60*1000
    }
}))

app.use("/auth", authRoutes)


const PORT = 8080


app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})
