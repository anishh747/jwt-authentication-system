import express from "express";
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import cookieParser from "cookie-parser";
import roomRoutes from './routes/roomRoutes.js'
import { Server } from "socket.io";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cookieParser())


const io = new Server(3001,{
    cors:{
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
    socket.on('joinRoomCode',(roomCode)=>{
      socket.join(roomCode);
  
      // Send a welcome message to the user who joined
      socket.emit('message', 'Welcome to the room');
  
      // Send a message to all members in the room (including the sender)
      io.to(roomCode).emit('message', 'A user has joined the room');
      
      // Listen for chat messages
      socket.on('chatMessage',(data)=>{
        io.to(roomCode).emit("receiveChatMessage", data);
      });
  
      // Message on disconnection
      socket.on('disconnect',()=>{
        io.to(roomCode).emit('message','A user has left the room');
      });
    });
  });

io.listen(3000);

app.use('/api/users',userRoutes);
app.use('/api/room',roomRoutes);

app.get('/',(req, res)=>{
    res.send('Server is ready');
})

app.use(errorHandler);
app.use(notFound);

app.listen(PORT,()=>{
    console.log("Server started")
})