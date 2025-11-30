import  {Server} from "socket.io";
import express from "express";
import http from "http";
import dotenv from "dotenv";

dotenv.config();
const app=express();
const server=http.createServer(app);
const userSocketMap={};
const io=new Server(server,{
    cors:{
        origin:process.env.FRONTEND_URL
    }
});
export function getSocketIdByUserId(userId){
    return userSocketMap[userId];
}
io.on("connection",(socket)=>{
    console.log("New user connected:",socket.id);
    const userId=socket.handshake.auth.userId;
    if(userId) userSocketMap[userId]=socket.id;
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        console.log("User disconnected:",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    });
});
export {io,app,server};