import express from "express";
import dotenv from "dotenv";
import chats from "./data.js";
import authRoutes from "./Routes/auth.route.js";
import messageRoutes from "./Routes/message.route.js";
import friendRoutes from "./Routes/friend.route.js";
import {connectDB} from "./Lib/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' assert { type: 'json' };
import {app,server} from "./Lib/socket.js";
import mongoose from "mongoose";
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
dotenv.config();
app.use(express.json());

/* 
  #swagger.auto = true 
  #swagger.tags = ['Auth']
*/
app.use("/api/auth", authRoutes);

/* 
  #swagger.auto = true 
  #swagger.tags = ['Message']
*/
app.use("/api/messages", messageRoutes);

/* 
  #swagger.auto = true 
  #swagger.tags = ['Friends']
*/
app.use("/api/friends", friendRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const PORT=process.env.PORT||5000;
server.listen(PORT,()=>{
    console.log(`Backend server started successfully on port ${PORT}!`);
    connectDB();
});