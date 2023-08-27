import express from "express";
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'


dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use('/api/users',userRoutes);

app.get('/',(req, res)=>{
    res.send('Server is ready');
})

app.use(errorHandler);
app.use(notFound);

app.listen(PORT,()=>{
    console.log("Server started")
})