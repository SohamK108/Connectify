import express from "express";
import dotenv from "dotenv";
import chats from "./data.js";
import authRoutes from "./Routes/auth.route.js";
import messageRoutes from "./Routes/message.route.js";
import {connectDB} from "./Lib/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // Required to parse JSON request body
app.use(express.urlencoded({ extended: true })); // Optional: for handling form-urlencoded data
app.use(cookieParser());
dotenv.config();
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Backend server started successfully on port ${PORT}!`);
    connectDB();
});