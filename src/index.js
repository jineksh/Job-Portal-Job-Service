import express from 'express';
import dotenv from 'dotenv';
import {PORT} from './config/server.js';
import { errorMiddleware } from "./middleware/errorHandler.js";
import ApiRoutes from './routes/index.js';
import emailWorker from './workers/mail.js';
import cors from 'cors';
dotenv.config();


const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Specify your frontend URL
    credentials: true,               // Allow cookies/headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

app.get('/home',(req,res)=>{
    res.send('Job Service is up and running');
});

app.use('/api',ApiRoutes);

emailWorker('updateApplicationMailQueue');

app.use(errorMiddleware);


app.listen(PORT,()=>{
    console.log(`Job Service is running on port ${PORT}`);
})