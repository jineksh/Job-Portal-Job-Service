import express from 'express';
import dotenv from 'dotenv';
import {PORT} from './config/server.js';
dotenv.config();


const app = express();

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));



// app.use(errorMiddleware);


app.listen(PORT,()=>{
    console.log(`Job Service is running on port ${PORT}`);
})