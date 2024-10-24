import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./config/passport";  // Import your Passport configuration

// Routes
import authRoutes from "./routes/auth";

import contractsRoute from "./routes/contract"

import paymentsRoute from "./routes/payments"

// Initialize express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Security headers middleware
app.use(helmet());

// Logging middleware
app.use(morgan("dev"));

// JSON body parser middleware
app.use(express.json());

// CORS setup
app.use(cors({
  origin: process.env.CLIENT_URL,  // Allow requests from your frontend
  credentials: true,               // Allow credentials (cookies)
}));

// **Session middleware setup (must be before passport)**
app.use(session({
  secret: process.env.SESSION_SECRET!, // Use a strong secret from your .env file
  resave: false,                       // Don't save session if not modified
  saveUninitialized: false,            // Don't create session until something is stored
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI!, // MongoDB session store
  }),
  cookie: {
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Cross-site cookie settings
    maxAge: 24 * 60 * 60 * 1000, // 1-day expiration
  },
}));

// Initialize Passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);

app.use("/contracts", contractsRoute)

app.use("/payments", paymentsRoute)

// Set the port
const PORT = 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
