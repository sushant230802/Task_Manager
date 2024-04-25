import express from 'express';
import mongoose from 'mongoose';
import User from './models/user.js';
import UserRoutes from './routes/user.js';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import taskRoutes from './routes/task.js';
import { errorMiddleware } from './middlewares/error.js';
import cors from 'cors';

config({
    path:"./data/config.env",
})
export const app = express();
 

//using middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials:true,
}))
app.use("/api/v1/users",UserRoutes);
app.use("/api/v1/task",taskRoutes);
app.use(errorMiddleware);

