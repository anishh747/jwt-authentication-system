import express from "express";
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import cookieParser from "cookie-parser";
import roomRoutes from './routes/roomRoutes.js'

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cookieParser())


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